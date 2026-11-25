// @vitest-environment jsdom
import type { ReactElement } from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TieredTech from './TieredTech';
import { SingleTech, UniqueTech } from './SingleTech';
import { renderWithData, keys } from '../test/renderWithData';

afterEach(cleanup);

const tier = (name: string) => ({
  name,
  cost: [
    { amount: 100, resource: 'food' },
    { amount: 50, resource: 'gold' },
  ],
  description: `${name} description`,
});

const techstrings = {
  archerArmor: {
    title: 'Archer Armor',
    tierOne: tier('Padded Archer Armor'),
    tierTwo: tier('Leather Archer Armor'),
    tierThree: tier('Ring Archer Armor'),
  },
  villUpgrades: {
    title: 'Villager Upgrades',
    tierOne: tier('Wheelbarrow'),
    tierTwo: tier('Hand Cart'),
  },
  ballistics: { title: 'Ballistics', cost: [{ amount: 300, resource: 'wood' }], description: 'Aim' },
};

const renderTech = (ui: ReactElement) =>
  renderWithData(ui, { [keys.techstrings]: techstrings });

describe('TieredTech', () => {
  test('shows the title and the first tier', () => {
    renderTech(<TieredTech techKey='archerArmor' />);
    expect(screen.getByText('Archer Armor')).toBeTruthy();
    expect(screen.getByText('Padded Archer Armor')).toBeTruthy();
    expect(screen.getByText('Padded Archer Armor description')).toBeTruthy();
    expect(screen.getByAltText('food')).toBeTruthy();
    expect(screen.getByAltText('gold')).toBeTruthy();
  });

  test('arrows step through all three tiers and stop at each end', async () => {
    const user = userEvent.setup();
    renderTech(<TieredTech techKey='archerArmor' />);
    const prev = screen.getByRole('button', { name: 'Previous tier' });
    const next = screen.getByRole('button', { name: 'Next tier' });

    expect(prev.getAttribute('aria-disabled')).toBe('true');
    await user.click(prev);
    expect(screen.getByText('Padded Archer Armor')).toBeTruthy();

    await user.click(next);
    expect(screen.getByText('Leather Archer Armor')).toBeTruthy();
    await user.click(next);
    expect(screen.getByText('Ring Archer Armor')).toBeTruthy();
    expect(next.getAttribute('aria-disabled')).toBe('true');
    await user.click(next);
    expect(screen.getByText('Ring Archer Armor')).toBeTruthy();

    await user.click(prev);
    expect(screen.getByText('Leather Archer Armor')).toBeTruthy();
  });

  test('a two-tier upgrade stops at the second tier', async () => {
    const user = userEvent.setup();
    renderTech(<TieredTech techKey='villUpgrades' />);
    const next = screen.getByRole('button', { name: 'Next tier' });

    await user.click(next);
    expect(screen.getByText('Hand Cart')).toBeTruthy();
    expect(next.getAttribute('aria-disabled')).toBe('true');
    await user.click(next);
    expect(screen.getByText('Hand Cart')).toBeTruthy();
  });

  test('renders nothing when the upgrade is missing from the data', () => {
    const { container } = renderTech(<TieredTech techKey='mill' />);
    expect(container.textContent).toBe('');
  });
});

describe('SingleTech', () => {
  test('shows title, cost and description', () => {
    renderTech(<SingleTech techKey='ballistics' />);
    expect(screen.getByText('Ballistics')).toBeTruthy();
    expect(screen.getByText('Aim')).toBeTruthy();
    expect(screen.getByAltText('wood')).toBeTruthy();
  });
});

describe('UniqueTech', () => {
  const uniquestrings = {
    britons: {
      castle: { title: 'Yeomen', cost: [{ amount: '750', resource: 'wood' }], description: 'Range' },
      imperial: { title: 'Warwolf', cost: [{ amount: '800', resource: 'wood' }], description: 'Blast' },
    },
  };

  test.each([
    ['castle', 'Yeomen'],
    ['imperial', 'Warwolf'],
  ] as const)('shows the %s age tech for the civ', (age, title) => {
    renderWithData(<UniqueTech civ='britons' age={age} />, { [keys.uniquestrings]: uniquestrings });
    expect(screen.getByText(title)).toBeTruthy();
  });

  test('renders nothing for an unknown or missing civ', () => {
    const data = { [keys.uniquestrings]: uniquestrings };
    expect(renderWithData(<UniqueTech civ='nope' age='castle' />, data).container.textContent).toBe('');
    cleanup();
    expect(renderWithData(<UniqueTech civ={undefined} age='castle' />, data).container.textContent).toBe('');
  });
});
