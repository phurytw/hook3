import React from 'react';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import ChartDistanceComparison from './ChartEvolutionOverTime';
import SelectedItemProvider from '../../contexts/SelectedItemProvider';
import Container from '../Container';

export const props = {
  runs: [
    {
      id: 1418692812,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 2.58, distance: 1003.1, time: 417 },
        { speed: 2.85, distance: 1001.7, time: 363 },
        { speed: 2.8, distance: 999, time: 372 },
        { speed: 2.98, distance: 996.9, time: 347 },
        { speed: 2.81, distance: 1002.1, time: 356 },
        { speed: 2.62, distance: 612.7, time: 238 },
      ],
    },
    {
      id: 1450775497,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 2.88, distance: 1002.3, time: 348 },
        { speed: 2.49, distance: 1001.6, time: 412 },
        { speed: 2.67, distance: 996.6, time: 385 },
        { speed: 2.5, distance: 1000.4, time: 400 },
        { speed: 2.59, distance: 1001.6, time: 393 },
        { speed: 2.6, distance: 999.9, time: 385 },
        { speed: 2.34, distance: 998, time: 431 },
        { speed: 2.59, distance: 1004.4, time: 388 },
        { speed: 2.72, distance: 950.8, time: 357 },
      ],
    },
    {
      id: 1465575891,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 3.31, distance: 1000, time: 325 },
        { speed: 3.1, distance: 1003.1, time: 335 },
        { speed: 3.1, distance: 998.6, time: 322 },
        { speed: 3, distance: 999.2, time: 340 },
        { speed: 3.1, distance: 1000.4, time: 323 },
        { speed: 2.89, distance: 1001.4, time: 346 },
        { speed: 2.84, distance: 1001.3, time: 352 },
        { speed: 2.81, distance: 996.2, time: 382 },
        { speed: 2.64, distance: 631.4, time: 245 },
      ],
    },
    {
      id: 1472741289,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 3.29, distance: 1000.8, time: 304 },
        { speed: 2.95, distance: 1002.7, time: 340 },
        { speed: 3.04, distance: 997.9, time: 338 },
        { speed: 2.76, distance: 998.7, time: 362 },
        { speed: 2.85, distance: 1001.5, time: 351 },
        { speed: 2.86, distance: 1002.7, time: 351 },
        { speed: 2.75, distance: 999.2, time: 364 },
        { speed: 2.61, distance: 999.5, time: 402 },
        { speed: 2.84, distance: 997.1, time: 351 },
        { speed: 2.75, distance: 112.8, time: 41 },
      ],
    },
    {
      id: 1486900857,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 3.3, distance: 1000.1, time: 320 },
        { speed: 3.25, distance: 1000.9, time: 314 },
        { speed: 2.84, distance: 1000.4, time: 352 },
        { speed: 2.9, distance: 998.8, time: 355 },
        { speed: 2.86, distance: 1003.1, time: 351 },
        { speed: 2.82, distance: 999.4, time: 354 },
        { speed: 2.68, distance: 1001.4, time: 379 },
        { speed: 1.98, distance: 71.1, time: 42 },
      ],
    },
    {
      id: 1503912745,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 3.34, distance: 1001.5, time: 316 },
        { speed: 2.94, distance: 1001, time: 340 },
        { speed: 3.02, distance: 1001.1, time: 336 },
        { speed: 2.93, distance: 998.8, time: 341 },
        { speed: 2.98, distance: 999.9, time: 335 },
        { speed: 2.8, distance: 1001, time: 358 },
        { speed: 3.12, distance: 966.4, time: 318 },
      ],
    },
    {
      id: 1513533402,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 3.04, distance: 1002.5, time: 337 },
        { speed: 2.94, distance: 998, time: 340 },
        { speed: 3.07, distance: 1001.5, time: 326 },
        { speed: 3.03, distance: 998.7, time: 340 },
        { speed: 3.05, distance: 1000.5, time: 328 },
        { speed: 2.93, distance: 999.7, time: 341 },
        { speed: 2.93, distance: 1005.5, time: 343 },
        { speed: 2.82, distance: 995.1, time: 353 },
        { speed: 2.88, distance: 999.8, time: 347 },
        { speed: 2.16, distance: 112.2, time: 58 },
      ],
    },
    {
      id: 1618383989,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 3.33, distance: 1002.7, time: 332 },
        { speed: 3.21, distance: 1001.2, time: 312 },
        { speed: 3.12, distance: 997, time: 320 },
        { speed: 2.97, distance: 1002.2, time: 346 },
        { speed: 3.05, distance: 999.9, time: 328 },
        { speed: 2.88, distance: 997.9, time: 350 },
        { speed: 2.93, distance: 1001.9, time: 342 },
        { speed: 2.87, distance: 1001.1, time: 354 },
        { speed: 2.98, distance: 199.4, time: 67 },
      ],
    },
    {
      id: 1693044259,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 3.24, distance: 1004, time: 322 },
        { speed: 2.93, distance: 999.1, time: 367 },
        { speed: 2.81, distance: 997, time: 359 },
        { speed: 2.83, distance: 1002.3, time: 354 },
        { speed: 2.56, distance: 1000.3, time: 407 },
        { speed: 2.98, distance: 1002.9, time: 337 },
        { speed: 2.89, distance: 998.1, time: 351 },
        { speed: 2.83, distance: 999, time: 353 },
        { speed: 2.8, distance: 999.7, time: 362 },
        { speed: 2.55, distance: 1000.4, time: 410 },
        { speed: 3.19, distance: 1000.1, time: 322 },
        { speed: 2.32, distance: 104.6, time: 45 },
      ],
    },
    {
      id: 1744562884,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 2.81, distance: 1006.8, time: 374 },
        { speed: 2.58, distance: 994.6, time: 397 },
        { speed: 2.45, distance: 1001.2, time: 408 },
        { speed: 2.37, distance: 1000.6, time: 432 },
        { speed: 2.07, distance: 1000.1, time: 482 },
        { speed: 2.02, distance: 997.3, time: 494 },
        { speed: 1.99, distance: 1000.6, time: 503 },
        { speed: 2.35, distance: 1002.2, time: 426 },
        { speed: 2.95, distance: 156.3, time: 64 },
      ],
    },
    {
      id: 1897847832,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 3.22, distance: 1002.3, time: 315 },
        { speed: 2.7, distance: 1002.7, time: 372 },
        { speed: 2.81, distance: 996.5, time: 355 },
        { speed: 2.9, distance: 1000.9, time: 345 },
        { speed: 2.91, distance: 998.7, time: 343 },
        { speed: 2.88, distance: 1004, time: 349 },
        { speed: 2.81, distance: 997.2, time: 355 },
        { speed: 2.9, distance: 999.9, time: 345 },
        { speed: 2.95, distance: 584.4, time: 198 },
      ],
    },
    {
      id: 1952881385,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 2.96, distance: 1000.1, time: 355 },
        { speed: 2.96, distance: 1000.2, time: 343 },
        { speed: 2.93, distance: 999.7, time: 345 },
        { speed: 2.91, distance: 1002.7, time: 345 },
        { speed: 2.67, distance: 999.6, time: 375 },
        { speed: 3.02, distance: 1000.4, time: 331 },
        { speed: 3.07, distance: 999.5, time: 331 },
        { speed: 3.03, distance: 1000, time: 330 },
        { speed: 3, distance: 1000.7, time: 339 },
        { speed: 2.95, distance: 998.9, time: 350 },
        { speed: 3.1, distance: 999.7, time: 323 },
        { speed: 2.93, distance: 99.6, time: 34 },
      ],
    },
    {
      id: 1965905852,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 2.57, distance: 1001.3, time: 421 },
        { speed: 2.25, distance: 1000.4, time: 461 },
        { speed: 2.89, distance: 1000.9, time: 350 },
        { speed: 2.44, distance: 1000.8, time: 418 },
        { speed: 3.23, distance: 1002.2, time: 310 },
        { speed: 2.96, distance: 995.6, time: 336 },
        { speed: 3, distance: 999.7, time: 333 },
        { speed: 3.05, distance: 1001.9, time: 329 },
        { speed: 2.96, distance: 1000.2, time: 338 },
        { speed: 3.02, distance: 999.9, time: 336 },
        { speed: 3.33, distance: 1000.9, time: 301 },
        { speed: 2.84, distance: 164.9, time: 58 },
      ],
    },
    {
      id: 1978589855,
      type: 'SEGMENT_GROUP',
      splits: [
        { speed: 2.73, distance: 1003.1, time: 402 },
        { speed: 2.88, distance: 1001.8, time: 353 },
        { speed: 2.89, distance: 995.8, time: 345 },
        { speed: 2.92, distance: 1004.4, time: 344 },
        { speed: 2.89, distance: 996.4, time: 350 },
        { speed: 2.87, distance: 999.2, time: 348 },
        { speed: 2.95, distance: 1001.8, time: 356 },
        { speed: 3.06, distance: 1001.8, time: 327 },
        { speed: 3.23, distance: 996.2, time: 308 },
        { speed: 3.6, distance: 1004.2, time: 279 },
        { speed: 3.2, distance: 995.7, time: 311 },
        { speed: 3.16, distance: 183.1, time: 58 },
      ],
    },
  ],
};

storiesOf('Chart: Evolution Over Time', module)
  .addDecorator((story, context) =>
    withConsole()(() => (
      <SelectedItemProvider>
        <Container>{story()}</Container>
      </SelectedItemProvider>
    ))(context)
  )
  .add('default', () => <ChartDistanceComparison {...props} />);
