import React from 'react';
import { createRoot } from 'react-dom/client';
import SiteHeader from '../site-header/SiteHeader';
import SiteFooter from '../site-footer/SiteFooter';
import { RevenueInfrastructure } from '../revenue-infrastructure/RevenueInfrastructure';
import { BuyerJourney } from '../buyer-journey/BuyerJourney';
import TableOfContents from '../table-of-contents/TableOfContents';
import logo from '../assets/growthworks-official-logo.png';
import whiteLogo from '../assets/growthworks-official-logo-white.png';
import '../shared/styles.css';
import './styles.css';
const items = [{ id: 'header-example', label: 'Header' }, { id: 'footer-example', label: 'Footer' }, { id: 'revenue-example', label: 'Revenue' }, { id: 'buyer-example', label: 'Buyer Journey' }];
createRoot(document.getElementById('root')!).render(<React.StrictMode>
  <div id="header-example"><SiteHeader logoSrc={logo} /></div>
  <main>
    <h1 className="preview-title">Reusable Component Library</h1>
    <p className="preview-note">Local review: header, footer, revenue infrastructure, buyer journey, and table of contents.</p>
    <div id="footer-example"><SiteFooter logoSrc={whiteLogo} /></div>
    <div id="revenue-example"><RevenueInfrastructure /></div>
    <div id="buyer-example"><BuyerJourney /></div>
  </main>
  <TableOfContents items={items} />
</React.StrictMode>);
