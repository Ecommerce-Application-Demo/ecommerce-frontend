import React from 'react';

const payOnDelivery=({color='var(--Black)'})=>{
      return (
    <svg
      id="prefix__Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      className="pincode-serviceabilityIcon"
      style={{ width: '40px', height: '40px' }}
    >
      <defs>
        <mask
          id="prefix__mask"
          x="0"
          y="0"
          width="24"
          height="24"
          maskUnits="userSpaceOnUse"
        >
          <g id="prefix__b">
            <path id="prefix__a" className="prefix__cls-1" d="M0 0h24v24H0z" />
          </g>
        </mask>
        <mask
          id="prefix__mask-2"
          x="5.17"
          y="2"
          width="13.59"
          height="20"
          maskUnits="userSpaceOnUse"
        >
          <g id="prefix__d">
            <path
              id="prefix__c"
              className="prefix__cls-1"
              d="M5.17 2h13.59v20H5.17z"
            />
          </g>
        </mask>
        <style>
          {`.prefix__cls-1,.prefix__cls-4{fill:#fff;fill-rule:evenodd;}.prefix__cls-4{fill:${color}}`}
        </style>
      </defs>
      <g mask="url(#prefix__mask)">
        <g mask="url(#prefix__mask-2)">
          <path
            className="prefix__cls-4"
            d="M17.59 18v2.47a1.17 1.17 0 010 .32 1.13 1.13 0 01-.32 0h-2.76a4.18 4.18 0 01-4-3.48h1.14a.57.57 0 00.57-.57.58.58 0 00-.57-.58H6.84a1.17 1.17 0 01-.45-.05 1.27 1.27 0 010-.44v-3.63-8.5a.51.51 0 01.09-.35.44.44 0 01.33-.08h6.08a1.1 1.1 0 01.31 0 1.31 1.31 0 010 .33v7.15a.59.59 0 00.58.58.58.58 0 00.57-.59V8.91l2.23 2.74.31.42a2.5 2.5 0 01.74 1.57v4.38m1.17-4.36a3.55 3.55 0 00-1-2.3l-.3-.39-3.17-3.89V3.52c0-1-.48-1.5-1.5-1.5H11C9.64 2 8.19 2 6.78 2a1.54 1.54 0 00-1.17.42 1.59 1.59 0 00-.44 1.18V15.72c0 1.18.46 1.64 1.65 1.64h2.47A5.31 5.31 0 0014.51 22h2.74a1.32 1.32 0 001.5-1.5V18v-4.36"
          />
        </g>
        <path
          className="prefix__cls-4"
          d="M14.54 12.57c-.71-.76-1.43-1.51-2.17-2.25a1.72 1.72 0 00-1.78-.46 1.54 1.54 0 00-1 1.3 2 2 0 00.64 1.6l2.08 2.15.53.55a3.93 3.93 0 001.08 4 .58.58 0 00.82.05.57.57 0 000-.81c-1-1.15-1.22-2.06-.75-3.14a.55.55 0 00-.11-.63l-.79-.82c-.7-.71-1.39-1.42-2.07-2.14-.27-.28-.36-.46-.33-.66A.36.36 0 0111 11a.6.6 0 01.6.18c.72.73 1.45 1.49 2.14 2.23l.92 1a.58.58 0 00.82 0 .57.57 0 000-.82l-.91-1m-3.94-3.78a.29.29 0 00.29-.28.27.27 0 00-.09-.21L9.35 6.83a1.17 1.17 0 00.52-.36 1.53 1.53 0 00.32-.62h1a.29.29 0 00.27-.31.28.28 0 00-.27-.27h-.86a2.49 2.49 0 000-.48h.87a.29.29 0 100-.58H8.37a.29.29 0 100 .58h1.21a2.56 2.56 0 010 .48H8.37a.29.29 0 000 .58h1.21a.72.72 0 01-.14.24.8.8 0 01-.7.24.3.3 0 00-.28.17.33.33 0 00.06.33l1.9 1.9a.32.32 0 00.21.08"
        />
      </g>
    </svg>
  );
}

export default payOnDelivery;
