// @vitest-environment jsdom
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { act, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { renderWithData, keys } from './test/renderWithData';

type ContextCallback = (context: { game?: string; playerChannel?: string }, changed: string[]) => void;

let contextListeners: ContextCallback[] = [];

beforeEach(() => {
  contextListeners = [];
  window.Twitch = { ext: { onContext: (cb) => void contextListeners.push(cb) } };
  globalThis.ResizeObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
  };
});
afterEach(() => {
  cleanup();
  delete window.Twitch;
});

const sendContext = (context: { game?: string; playerChannel?: string }) =>
  act(() => contextListeners.forEach((cb) => cb(context, [])));

const tier = (name: string) => ({ name, cost: [{ amount: 1, resource: 'food' }], description: '' });
const tiered = (title: string) => ({
  title,
  tierOne: tier(`${title} 1`),
  tierTwo: tier(`${title} 2`),
  tierThree: tier(`${title} 3`),
});

const profile = {
  // icon name -> [left, top, id]; deliberately not in the old fixed order
  coordinatesLeft: { 'horsecollar.png': [37, 5, 2], 'fletching.png': [104, 48, 9], 'unknown.png': [0, 0, 99] },
  coordinatesRight: { 'horsecollar.png': [1787, 5, 12], 'castle.png': [1700, 5, 21] },
  leftCivBox: [650, 0],
  rightCivBox: [1050, 0],
};

const data = {
  [keys.profiles]: { defaultProfile: profile },
  [keys.techstrings]: {
    mill: tiered('Farm Upgrades'),
    pasture: tiered('Pasture Upgrades'),
    archerAttack: tiered('Archer Attack'),
  },
  [keys.uniquestrings]: {
    britons: {
      castle: { title: 'Yeomen', cost: [], description: '' },
      imperial: { title: 'Warwolf', cost: [], description: '' },
    },
  },
  [keys.civstrings]: {},
  [keys.civs('somestreamer')]: ['khitans', 'britons'],
};

const AOE2 = { game: 'Age of Empires II: Definitive Edition', playerChannel: 'somestreamer' };

const hoverBoxes = () => document.querySelectorAll<HTMLElement>('.tooltip-box');

describe('App', () => {
  test('renders nothing until Twitch reports an AoE2 stream', async () => {
    renderWithData(<App />, data);
    expect(hoverBoxes()).toHaveLength(0);

    await sendContext({ game: 'Just Chatting', playerChannel: 'somestreamer' });
    expect(hoverBoxes()).toHaveLength(0);

    await sendContext(AOE2);
    // 2 known left icons (unknown.png is skipped) + 2 right icons + 2 civ boxes
    expect(hoverBoxes()).toHaveLength(2 + 2 + 2);
  });

  test('registers the Twitch context listener only once', async () => {
    renderWithData(<App />, data);
    await sendContext(AOE2);
    await sendContext({ ...AOE2, playerChannel: 'other' });
    await sendContext(AOE2);
    // StrictMode isn't used here, so exactly one listener should exist
    expect(contextListeners).toHaveLength(1);
  });

  test('looks up tooltips by icon name, per civ', async () => {
    const user = userEvent.setup();
    renderWithData(<App />, data);
    await sendContext(AOE2);
    const [leftMill, leftFletching, , rightMill, rightCastle] = hoverBoxes();

    // Left player is Khitans: the mill icon shows pasture upgrades
    await user.hover(leftMill);
    expect(await screen.findByText('Pasture Upgrades')).toBeTruthy();
    await user.unhover(leftMill);

    await user.hover(leftFletching);
    expect(await screen.findByText('Archer Attack')).toBeTruthy();
    await user.unhover(leftFletching);

    // Right player is Britons: normal farm upgrades and their castle tech
    await user.hover(rightMill);
    expect(await screen.findByText('Farm Upgrades')).toBeTruthy();
    await user.unhover(rightMill);

    await user.hover(rightCastle);
    expect(await screen.findByText('Yeomen')).toBeTruthy();
  });

  test('works when the Twitch helper is missing', () => {
    delete window.Twitch;
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderWithData(<App />, data)).not.toThrow();
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
