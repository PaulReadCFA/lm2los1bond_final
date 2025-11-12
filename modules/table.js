/**
 * Table Rendering Module
 * Renders accessible data table for bond cash flows
 */

import { $, formatCurrency } from './utils.js';

/**
 * Render cash flow table
 * @param {Array} cashFlows - Array of cash flow objects
 * @param {number} bondPrice - Bond price
 * @param {number} periods - Number of periods
 * @param {number} periodicCoupon - Periodic coupon payment
 */
export function renderTable(cashFlows, bondPrice, periods, periodicCoupon) {
  const table = $('#cash-flow-table');
  
  if (!table) {
    console.error('Table element not found');
    return;
  }
  
  // Build table HTML
  let html = `
    <caption class="sr-only">Bond cash flow schedule showing period, coupon payments, principal repayment, and total cash flows</caption>
    <thead>
      <tr>
        <th scope="col" class="text-left">Period</th>
        <th scope="col" class="text-left">Year</th>
        <th scope="col" class="text-right">Coupon Payment</th>
        <th scope="col" class="text-right">Principal Repayment</th>
        <th scope="col" class="text-right">Total Cash Flow</th>
      </tr>
    </thead>
    <tbody>
  `;
  
  // Add rows for each cash flow
  cashFlows.forEach((cf, index) => {
    const isInitial = index === 0;
    const isFinal = index === cashFlows.length - 1;
    
    html += `
      <tr>
        <td class="text-left">${cf.period}</td>
        <td class="text-left">${cf.yearLabel.toFixed(1)}</td>
        <td class="text-right">${formatCurrency(cf.couponPayment)}</td>
        <td class="text-right">${formatCurrency(cf.principalPayment)}</td>
        <td class="text-right"><strong>${formatCurrency(cf.totalCashFlow)}</strong></td>
      </tr>
    `;
  });
  
  html += `
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" class="text-right">Bond Price (PV of all cash flows):</td>
        <td class="text-right"><strong>${formatCurrency(bondPrice)}</strong></td>
      </tr>
    </tfoot>
  `;
  
  table.innerHTML = html;
}