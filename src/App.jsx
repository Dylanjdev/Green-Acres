import { useState } from "react";
import whiskeyImg from "./assets/Whiskey.webp";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0C0C0B;
    --surface: #141412;
    --surface-2: #1C1A18;
    --gold: #C49A3C;
    --gold-dim: rgba(196,154,60,0.4);
    --text: #EDE8E0;
    --muted: #6B6358;
    --border: rgba(196,154,60,0.12);
    --border-light: rgba(237,232,224,0.07);
  }

  body { background: var(--bg); font-family: 'Inter', system-ui, sans-serif; color: var(--text); overflow-x: hidden; -webkit-font-smoothing: antialiased; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    background: rgba(12,12,11,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 500; letter-spacing: 0.2em; color: var(--text); text-transform: uppercase; }
  .nav-links { display: flex; gap: 40px; }
  .nav-links a, .nav-links button {
    font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 400; letter-spacing: 0.1em;
    color: var(--muted); text-decoration: none; text-transform: uppercase;
    background: none; border: none; cursor: pointer; transition: color 0.2s;
  }
  .nav-links a:hover, .nav-links button:hover { color: var(--text); }
  .nav-cta {
    font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.15em;
    padding: 9px 22px; border: 1px solid var(--border); color: var(--gold);
    background: none; cursor: pointer; text-transform: uppercase; transition: all 0.25s;
  }
  .nav-cta:hover { border-color: var(--gold); background: rgba(196,154,60,0.06); }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;
    text-align: center; position: relative; overflow: hidden;
    background: var(--bg);
    padding: 140px 24px 100px;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 70% 55% at 50% 60%, rgba(196,154,60,0.055) 0%, transparent 70%);
  }

  .hero-eyebrow {
    font-family: 'Inter', sans-serif; font-size: 0.67rem; font-weight: 500; letter-spacing: 0.38em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 28px;
    animation: fadeUp 1s ease both 0.2s;
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(3.5rem, 9vw, 7.5rem);
    font-weight: 300; line-height: 1.15; color: var(--text); letter-spacing: -0.01em;
    animation: fadeUp 1s ease both 0.4s;
  }
  .hero-title em { font-style: italic; color: var(--gold); display: block; }
  .hero-sub {
    font-family: 'Inter', sans-serif; font-size: 0.95rem; font-weight: 300;
    color: var(--muted); margin: 28px 0 48px;
    max-width: 400px; line-height: 1.8; animation: fadeUp 1s ease both 0.6s; letter-spacing: 0.01em;
  }
  .hero-divider {
    width: 36px; height: 1px; background: var(--gold); opacity: 0.6;
    margin: 0 auto 28px; animation: fadeUp 1s ease both 0.5s;
  }
  .hero-btns {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
    margin-bottom: 64px; animation: fadeUp 1s ease both 0.8s;
  }
  .btn-primary {
    padding: 13px 36px; background: var(--gold); color: var(--bg);
    font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.2em;
    text-transform: uppercase; border: none; cursor: pointer;
    transition: all 0.25s;
  }
  .btn-primary:hover { background: #D4AA54; transform: translateY(-1px); }
  .btn-outline {
    padding: 13px 36px; background: transparent; color: var(--text);
    font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 400; letter-spacing: 0.2em;
    text-transform: uppercase; border: 1px solid var(--border-light); cursor: pointer;
    transition: all 0.3s;
  }
  .btn-outline:hover { border-color: rgba(237,232,224,0.2); background: rgba(237,232,224,0.03); }
  @keyframes fadeUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }

  /* ABOUT STRIP */
  .strip {
    background: var(--surface); padding: 28px 48px;
    display: flex; justify-content: center; gap: 80px; flex-wrap: wrap;
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  }
  .strip-item { text-align: center; }
  .strip-num { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; color: var(--gold); line-height: 1; letter-spacing: 0.02em; }
  .strip-label { font-family: 'Inter', sans-serif; font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }

  /* SECTIONS */
  section { padding: 120px 48px; max-width: 1200px; margin: 0 auto; }
  .section-eyebrow {
    font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 500; letter-spacing: 0.4em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 20px;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 300; line-height: 1.3; color: var(--text); margin-bottom: 24px; letter-spacing: -0.01em;
  }
  .section-title em { font-style: italic; color: var(--gold); }
  .section-body { font-family: 'Inter', sans-serif; font-size: 0.92rem; font-weight: 300; color: var(--muted); line-height: 1.85; max-width: 520px; }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
  .about-img-block { position: relative; }
  .about-img-placeholder {
    width: 100%; aspect-ratio: 4/5;
    background: var(--surface-2);
    border: 1px solid var(--border);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .about-img-placeholder img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .about-img-tag {
    position: absolute; bottom: -16px; right: -16px;
    background: var(--gold); padding: 16px 24px;
    font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--bg);
    font-size: 0.9rem; line-height: 1.4; max-width: 200px; font-weight: 500;
  }
  .about-list { list-style: none; margin-top: 32px; display: flex; flex-direction: column; gap: 14px; }
  .about-list li {
    display: flex; align-items: flex-start; gap: 14px;
    font-family: 'Inter', sans-serif; font-size: 0.88rem; font-weight: 300; color: var(--muted); line-height: 1.65;
  }
  .about-list li::before { content: ''; width: 4px; height: 4px; background: var(--gold); border-radius: 50%; margin-top: 8px; flex-shrink: 0; opacity: 0.7; }

  /* CATEGORIES */
  .cats-section { background: var(--surface); padding: 120px 0; }
  .cats-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
  .cats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 60px; background: var(--border); }
  .cat-card {
    background: var(--surface); padding: 48px 32px; text-align: left; cursor: pointer;
    transition: background 0.3s;
  }
  .cat-card:hover { background: var(--surface-2); }
  .cat-icon { font-size: 1.8rem; margin-bottom: 24px; display: block; opacity: 0.85; }
  .cat-name {
    font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 400;
    color: var(--text); margin-bottom: 10px; letter-spacing: 0.01em;
  }
  .cat-desc { font-family: 'Inter', sans-serif; font-size: 0.83rem; font-weight: 300; color: var(--muted); line-height: 1.7; }
  .cat-tag {
    display: inline-block; margin-top: 20px; font-family: 'Inter', sans-serif;
    font-size: 0.62rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold);
  }

  /* HOURS */
  .hours-section { background: var(--bg); padding: 120px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .hours-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 48px;
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 64px; align-items: start;
  }
  .hours-table { width: 100%; border-collapse: collapse; margin-top: 32px; }
  .hours-table tr { border-bottom: 1px solid var(--border-light); }
  .hours-table td { padding: 13px 0; font-family: 'Inter', sans-serif; font-size: 0.88rem; font-weight: 300; color: var(--muted); }
  .hours-table td:first-child { color: var(--text); font-weight: 400; }
  .hours-table td:last-child { text-align: right; }
  .hours-table tr.today td { color: var(--gold) !important; }
  .hours-table tr.today td:first-child::after { content: ' ←'; font-size: 0.6rem; opacity: 0.5; }

  .info-block { display: flex; flex-direction: column; gap: 24px; margin-top: 32px; }
  .info-item { display: flex; flex-direction: column; gap: 4px; padding-bottom: 24px; border-bottom: 1px solid var(--border-light); }
  .info-item:last-child { border-bottom: none; padding-bottom: 0; }
  .info-label { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
  .info-value { font-family: 'Inter', sans-serif; font-size: 0.92rem; font-weight: 400; color: var(--text); line-height: 1.5; }
  .info-sub { font-family: 'Inter', sans-serif; font-size: 0.83rem; font-weight: 300; color: var(--muted); margin-top: 2px; line-height: 1.5; }
  .map-wrap { margin-top: 32px; border: 1px solid var(--border); overflow: hidden; }
  .map-wrap iframe { display: block; width: 100%; height: 340px; border: none; filter: grayscale(1) invert(0.9) contrast(0.85); }

  /* REVIEWS */
  .reviews-section { background: var(--surface); padding: 120px 0; }
  .reviews-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
  .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 60px; background: var(--border); }
  .review-card { background: var(--surface); padding: 36px 32px; }
  .review-stars { color: var(--gold); font-size: 0.72rem; margin-bottom: 20px; letter-spacing: 0.1em; }
  .review-text { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-style: italic; font-weight: 300; color: var(--text); line-height: 1.75; margin-bottom: 24px; }
  .review-author { font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text); }
  .review-source { font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 300; color: var(--muted); margin-top: 4px; }

  /* APPLY CTA */
  .apply-cta {
    background: var(--gold); padding: 100px 48px; text-align: center;
  }
  .apply-cta h2 {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 2.8rem);
    color: var(--bg); margin-bottom: 12px; font-weight: 400; line-height: 1.3; letter-spacing: -0.01em;
  }
  .apply-cta p { font-family: 'Inter', sans-serif; color: rgba(12,12,11,0.6); font-size: 0.9rem; font-weight: 300; margin-bottom: 36px; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 1.75; }
  .btn-dark {
    padding: 13px 40px; background: var(--bg); color: var(--gold);
    font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.2em;
    text-transform: uppercase; border: none; cursor: pointer; transition: all 0.25s;
  }
  .btn-dark:hover { opacity: 0.85; transform: translateY(-1px); }

  /* FOOTER */
  footer {
    background: var(--bg); padding: 80px 48px 40px;
    border-top: 1px solid var(--border);
  }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; }
  .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 400; color: var(--text); letter-spacing: 0.05em; margin-bottom: 14px; }
  .footer-tagline { font-family: 'Inter', sans-serif; font-size: 0.83rem; font-weight: 300; color: var(--muted); line-height: 1.8; }
  .footer-heading { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a { font-family: 'Inter', sans-serif; color: var(--muted); text-decoration: none; font-size: 0.83rem; font-weight: 300; transition: color 0.2s; }
  .footer-links a:hover { color: var(--text); }
  .footer-bottom {
    max-width: 1200px; margin: 48px auto 0; padding-top: 28px;
    border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
    font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 300; color: var(--muted); letter-spacing: 0.05em;
  }
  .age-badge {
    background: transparent; border: 1px solid var(--border);
    padding: 5px 12px; font-size: 0.62rem; letter-spacing: 0.2em; color: var(--gold);
  }

  /* =================== APPLICATION FORM =================== */
  .app-container {
    min-height: 100vh; background: var(--bg);
    display: flex; flex-direction: column; align-items: center;
    padding: 120px 24px 80px;
  }
  .app-header { text-align: center; margin-bottom: 56px; max-width: 700px; }
  .app-header h1 {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 5vw, 3.2rem);
    color: var(--text); font-weight: 300; line-height: 1.3; letter-spacing: -0.01em;
  }
  .app-header h1 em { font-style: italic; color: var(--gold); }
  .app-header p { font-family: 'Inter', sans-serif; color: var(--muted); font-size: 0.83rem; margin-top: 14px; font-weight: 300; }

  .app-progress { display: flex; align-items: center; gap: 0; margin-bottom: 56px; }
  .progress-step {
    display: flex; align-items: center; gap: 12px;
    font-family: 'Inter', sans-serif; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
  }
  .progress-num {
    width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 500;
    border: 1px solid var(--border); color: var(--muted); transition: all 0.4s;
  }
  .progress-num.active { background: var(--gold); color: var(--bg); border-color: var(--gold); }
  .progress-num.done { background: transparent; color: var(--gold); border-color: var(--gold-dim); }
  .progress-label { font-family: 'Inter', sans-serif; color: var(--muted); transition: color 0.4s; font-weight: 300; }
  .progress-label.active { color: var(--text); font-weight: 400; }
  .progress-line { width: 60px; height: 1px; background: var(--border); margin: 0 16px; }

  .app-form {
    background: var(--surface); border: 1px solid var(--border); padding: 56px;
    width: 100%; max-width: 780px; position: relative;
  }
  .app-form::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.6;
  }

  .form-page { display: none; }
  .form-page.active { display: block; }

  .form-section-title {
    font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 400;
    color: var(--text); margin-bottom: 6px; display: flex; align-items: center; gap: 16px; letter-spacing: 0.01em;
  }
  .form-section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .form-section-sub { font-family: 'Inter', sans-serif; color: var(--muted); font-size: 0.8rem; font-weight: 300; margin-bottom: 32px; }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .form-row.full { grid-template-columns: 1fr; }
  .form-row.triple { grid-template-columns: 1fr 1fr 1fr; }

  .field { display: flex; flex-direction: column; gap: 8px; }
  .field label {
    font-family: 'Inter', sans-serif; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--muted); font-weight: 500;
  }
  .field input, .field select, .field textarea {
    background: var(--bg); border: 1px solid var(--border);
    color: var(--text); font-family: 'Inter', sans-serif; font-size: 0.88rem; font-weight: 300;
    padding: 11px 14px; outline: none; transition: border-color 0.25s;
    -webkit-appearance: none; appearance: none;
  }
  .field input::placeholder, .field textarea::placeholder { color: var(--muted); opacity: 0.4; }
  .field input:focus, .field select:focus, .field textarea:focus {
    border-color: var(--gold-dim);
  }
  .field select option { background: var(--surface); }
  .field textarea { resize: vertical; min-height: 100px; }

  .field-hint { font-family: 'Inter', sans-serif; font-size: 0.73rem; font-weight: 300; color: var(--muted); opacity: 0.7; }

  .checkbox-group { display: flex; flex-direction: column; gap: 12px; }
  .checkbox-item { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .checkbox-item input[type="checkbox"] { width: 15px; height: 15px; padding: 0; accent-color: var(--gold); cursor: pointer; }
  .checkbox-item span { font-family: 'Inter', sans-serif; color: var(--muted); font-size: 0.88rem; font-weight: 300; }

  .radio-group { display: flex; gap: 24px; flex-wrap: wrap; }
  .radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .radio-item input[type="radio"] { accent-color: var(--gold); cursor: pointer; }
  .radio-item span { font-family: 'Inter', sans-serif; color: var(--muted); font-size: 0.88rem; font-weight: 300; }

  .form-divider { border: none; border-top: 1px solid var(--border); margin: 36px 0; }

  .sig-box { border: 1px solid var(--border); padding: 28px; background: var(--bg); margin-top: 8px; }
  .sig-line {
    border-bottom: 1px solid var(--border); height: 56px; margin-top: 32px;
    display: flex; align-items: flex-end; padding-bottom: 8px;
    font-family: 'Inter', sans-serif; font-size: 0.62rem; letter-spacing: 0.2em; color: var(--muted); text-transform: uppercase; opacity: 0.5;
  }

  .disclaimer {
    font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 300; color: var(--muted); line-height: 1.75;
    margin-top: 24px; border-left: 2px solid var(--border); padding-left: 16px;
  }

  .form-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 48px; }
  .btn-form-back {
    padding: 11px 28px; background: transparent; color: var(--muted);
    font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 400; letter-spacing: 0.12em;
    text-transform: uppercase; border: 1px solid var(--border); cursor: pointer; transition: all 0.25s;
  }
  .btn-form-back:hover { color: var(--text); border-color: var(--border-light); }
  .btn-form-next {
    padding: 11px 36px; background: var(--gold); color: var(--bg);
    font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.2em;
    text-transform: uppercase; border: none; cursor: pointer; transition: all 0.25s;
  }
  .btn-form-next:hover { background: #D4AA54; transform: translateY(-1px); }

  .success-box { text-align: center; padding: 60px 20px; }
  .success-box .checkmark { font-size: 3rem; margin-bottom: 24px; opacity: 0.8; }
  .success-box h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 300; color: var(--gold); margin-bottom: 16px; }
  .success-box p { font-family: 'Inter', sans-serif; color: var(--muted); font-size: 0.92rem; font-weight: 300; line-height: 1.75; }

  .page-indicator { font-family: 'Inter', sans-serif; color: var(--muted); font-size: 0.7rem; font-weight: 300; letter-spacing: 0.2em; }

  @media (max-width: 768px) {
    nav { padding: 14px 20px; }
    .nav-links { display: none; }
    section { padding: 80px 20px; }
    .about-grid { grid-template-columns: 1fr; gap: 48px; }
    .cats-grid { grid-template-columns: 1fr; }
    .reviews-grid { grid-template-columns: 1fr; }
    .hours-inner { grid-template-columns: 1fr; gap: 60px; }
    .map-wrap iframe { height: 260px; }
    .footer-grid { grid-template-columns: 1fr; gap: 40px; }
    .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
    .form-row { grid-template-columns: 1fr; }
    .form-row.triple { grid-template-columns: 1fr; }
    .app-form { padding: 32px 24px; }
    .strip { gap: 40px; padding: 24px 20px; }
    .apply-cta { padding: 80px 24px; }
    .cats-inner { padding: 0 20px; }
    .reviews-inner { padding: 0 20px; }
  }
`;

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const HOURS = ["9 AM – 11 PM","9 AM – 11 PM","9 AM – 11 PM","9 AM – 11 PM","9 AM – 11 PM","9 AM – 11 PM","11 AM – 7 PM"];

const REVIEWS = [
  { text: "Best selection of whiskey in the Tri-Cities area, hands down. The staff knows their stuff and will steer you right every time.", author: "James T.", source: "Google Reviews", stars: 5 },
  { text: "Walk-in wine cellar is a treat. They carry bottles you simply cannot find anywhere else in Kingsport. My go-to spot for years.", author: "Marlena C.", source: "Yelp", stars: 5 },
  { text: "Great local package store with a real personality. They always have the specialty beers I'm hunting for. Staff is friendly and never pushy.", author: "Derek W.", source: "Google Reviews", stars: 4 },
];

const CATS = [
  { name: "Whiskey & Bourbon", desc: "Single malts, blends, Tennessee whiskey, and rare bourbons. We stock what others don't.", tag: "Signature Selection" },
  { name: "Wine Cellar", desc: "A walk-in cellar featuring domestic and imported varietals for every palate and price point.", tag: "Walk-In Cellar" },
  { name: "Craft & Import Beer", desc: "Stone, Dogfish Head, local craft brews, and rotating international imports.", tag: "Rotating Stock" },
  { name: "Spirits & Gin", desc: "Vodka, rum, gin, tequila — both everyday essentials and hard-to-find craft bottles.", tag: "Full Bar Stocking" },
  { name: "Mixers & Accessories", desc: "Everything you need to mix the perfect drink — bitters, sodas, garnishes, barware.", tag: "Complete Bar Setup" },
  { name: "Gift Sets", desc: "Curated gift sets for any occasion. Let us help you find the perfect bottle.", tag: "Custom Available" },
];

// ===================== MAIN APP =====================
export default function App() {
  const [page, setPage] = useState("home"); // home | apply
  const [formPage, setFormPage] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [todayIdx] = useState(() => {
    const d = new Date().getDay(); // 0=Sun
    return d === 0 ? 6 : d - 1; // Mon=0 in our array
  });
  const [form, setForm] = useState({
    // Page 1
    firstName: "", lastName: "", address: "", city: "", state: "TN", zip: "", phone: "", email: "",
    dob: "", over21: "",
    position: "", availability: [], startDate: "", hoursPerWeek: "",
    // Page 2
    prevEmployer1: "", prevTitle1: "", prevDates1: "", prevReason1: "",
    prevEmployer2: "", prevTitle2: "", prevDates2: "", prevReason2: "",
    education: "", degree: "", graduated: "",
    spirits: "", whiskeyExp: "", salesExp: "",
    felony: "", felonyExplain: "",
    signature: "", signDate: "",
    agreeDisclosure: false,
  });

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleAvail = (day) => {
    setForm(f => {
      const a = f.availability.includes(day)
        ? f.availability.filter(d => d !== day)
        : [...f.availability, day];
      return { ...f, availability: a };
    });
  };

  const handleSubmit = () => setSubmitted(true);

  return (
    <>
      <style>{style}</style>

      <nav>
        <div className="nav-logo">Greenacres Package Store</div>
        <div className="nav-links">
          <a href="#about" onClick={() => setPage("home")}>About</a>
          <a href="#selection" onClick={() => setPage("home")}>Selection</a>
          <a href="#hours" onClick={() => setPage("home")}>Hours</a>
          <a href="#reviews" onClick={() => setPage("home")}>Reviews</a>
          <button onClick={() => { setPage("apply"); setFormPage(1); setSubmitted(false); }}>Join Our Team</button>
        </div>
        <button className="nav-cta" onClick={() => window.open("tel:4232469682")}>
          (423) 246-9682
        </button>
      </nav>

      {page === "home" && (
        <>
          {/* HERO */}
          <div className="hero">
            <div className="hero-eyebrow">Est. in Kingsport, Tennessee</div>
            <h1 className="hero-title">
              Greenacres
              <em>Package Store</em>
            </h1>
            <div className="hero-divider" />
            <p className="hero-sub">
              The Tri-Cities' finest selection of wine, spirits & specialty beer — where every bottle tells a story.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => document.getElementById('selection').scrollIntoView({behavior:'smooth'})}>
                Our Selection
              </button>
              <button className="btn-outline" onClick={() => document.getElementById('hours').scrollIntoView({behavior:'smooth'})}>
                Hours & Location
              </button>
            </div>
          </div>

          {/* STRIP */}
          <div className="strip">
            <div className="strip-item"><div className="strip-num">4.2★</div><div className="strip-label">Google Rating</div></div>
            <div className="strip-item"><div className="strip-num">120+</div><div className="strip-label">Reviews</div></div>
            <div className="strip-item"><div className="strip-num">4.7★</div><div className="strip-label">Yelp Rating</div></div>
            <div className="strip-item"><div className="strip-num">1</div><div className="strip-label">#1 in Kingsport</div></div>
          </div>

          {/* ABOUT */}
          <section id="about">
            <div className="about-grid">
              <div className="about-img-block">
                <div className="about-img-placeholder">
                  <img src={whiskeyImg} alt="Whiskey selection at Greenacres Package Store" />
                </div>
                <div className="about-img-tag">One of the region's finest selections</div>
              </div>
              <div>
                <div className="section-eyebrow">Our Story</div>
                <h2 className="section-title">More Than a <em>Liquor Store</em></h2>
                <p className="section-body">
                  Located at Southland Shopping Center in Kingsport, TN, Greenacres Package Store has been the Tri-Cities' destination for discerning drinkers. We carry wines, spirits, and specialty beers that you simply won't find at the big box stores.
                </p>
                <ul className="about-list">
                  <li>Walk-in wine cellar with curated domestic and international selections</li>
                  <li>Rare and allocated bourbon & whiskey hunts — we can help you find it</li>
                  <li>Knowledgeable staff who are as passionate about spirits as you are</li>
                  <li>Rotating craft beer selection including Stone, Dogfish Head & local favorites</li>
                  <li>Full mixer & accessories aisle for the home bartender</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CATEGORIES */}
          <div className="cats-section" id="selection">
            <div className="cats-inner">
              <div className="section-eyebrow">What We Carry</div>
              <h2 className="section-title">Our <em>Selection</em></h2>
              <div className="cats-grid">
                {CATS.map(c => (
                  <div className="cat-card" key={c.name}>
                    <div className="cat-name">{c.name}</div>
                    <div className="cat-desc">{c.desc}</div>
                    <div className="cat-tag">{c.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* HOURS */}
          <div className="hours-section" id="hours">
            <div className="hours-inner">
              <div>
                <div className="section-eyebrow">When We're Open</div>
                <h2 className="section-title">Store <em>Hours</em></h2>
                <table className="hours-table">
                  <tbody>
                    {DAYS.map((d, i) => (
                      <tr key={d} className={i === todayIdx ? "today" : ""}>
                        <td>{d}</td>
                        <td>{HOURS[i]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className="section-eyebrow">Find Us</div>
                <h2 className="section-title">Come <em>Visit</em></h2>
                <div className="info-block">
                  <div className="info-item">
                    <div className="info-label">Address</div>
                    <div className="info-value">1229 N Eastman Rd, Suite 225</div>
                    <div className="info-sub">Kingsport, TN 37664</div>
                    <div className="info-sub" style={{color:'var(--gold)'}}>Southland Shopping Center</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Phone</div>
                    <div className="info-value"><a href="tel:4232469682" style={{color:'inherit',textDecoration:'none'}}>(423) 246-9682</a></div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Directions</div>
                    <div className="info-sub">About 8 minutes from downtown Kingsport</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Instagram</div>
                    <div className="info-value"><a href="https://www.instagram.com/greenacrespackagekpt/" target="_blank" rel="noopener noreferrer" style={{color:'inherit',textDecoration:'none'}}>@greenacrespackagekpt</a></div>
                    <div className="info-sub">163 followers · 340 posts</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section-eyebrow">Map</div>
                <h2 className="section-title">Our <em>Location</em></h2>
                <div className="map-wrap">
                  <iframe
                    title="Greenacres Package Store"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.4!2d-82.5332!3d36.5284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885a5b1f1f1f1f1f%3A0x0!2s1229+N+Eastman+Rd+%23225%2C+Kingsport%2C+TN+37664!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus&q=1229+N+Eastman+Rd+Suite+225,+Kingsport,+TN+37664"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="reviews-section" id="reviews">
            <div className="reviews-inner">
              <div className="section-eyebrow">What People Say</div>
              <h2 className="section-title">Guest <em>Reviews</em></h2>
              <div className="reviews-grid">
                {REVIEWS.map((r, i) => (
                  <div className="review-card" key={i}>
                    <div className="review-stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
                    <p className="review-text">{r.text}</p>
                    <div className="review-author">{r.author}</div>
                    <div className="review-source">{r.source}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* APPLY CTA */}
          <div className="apply-cta">
            <h2>Join the Greenacres Family</h2>
            <p>We're always looking for passionate, knowledgeable team members. Think you've got what it takes?</p>
            <button className="btn-dark" onClick={() => { setPage("apply"); setFormPage(1); setSubmitted(false); }}>
              Apply Now
            </button>
          </div>

          {/* FOOTER */}
          <footer>
            <div className="footer-grid">
              <div>
                <div className="footer-brand">Greenacres Package Store</div>
                <p className="footer-tagline">Carrying one of the region's best selections of wine, spirits and specialty beer in Kingsport, Tennessee since we opened our doors at Southland Shopping Center.</p>
              </div>
              <div>
                <div className="footer-heading">Quick Links</div>
                <ul className="footer-links">
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#selection">Our Selection</a></li>
                  <li><a href="#hours">Hours & Location</a></li>
                  <li><a href="#reviews">Reviews</a></li>
                  <li><a href="#" onClick={e=>{e.preventDefault();setPage("apply");setFormPage(1);setSubmitted(false);}}>Employment</a></li>
                </ul>
              </div>
              <div>
                <div className="footer-heading">Hours</div>
                <ul className="footer-links">
                  <li><span style={{color:'var(--muted)'}}>Mon–Sat: 9 AM – 11 PM</span></li>
                  <li><span style={{color:'var(--muted)'}}>Sunday: 11 AM – 7 PM</span></li>
                </ul>
                <div style={{marginTop:24}}>
                  <div className="footer-heading">Contact</div>
                  <ul className="footer-links">
                    <li><a href="tel:4232469682">(423) 246-9682</a></li>
                    <li><span style={{color:'var(--muted)'}}>1229 N Eastman Rd #225</span></li>
                    <li><span style={{color:'var(--muted)'}}>Kingsport, TN 37664</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 Greenacres Package Store. All rights reserved.</span>
              <span className="age-badge">Must Be 21+ To Purchase</span>
              <span>Built by <a href="https://smithdigitals.com/" target="_blank" rel="noopener noreferrer" style={{color:'inherit',textDecoration:'underline',textUnderlineOffset:'3px'}}>Smith Digitals</a></span>
            </div>
          </footer>
        </>
      )}

      {/* =================== APPLICATION =================== */}
      {page === "apply" && (
        <div className="app-container">
          <div className="app-header">
            <div className="section-eyebrow" style={{textAlign:'center',marginBottom:12}}>Greenacres Package Store</div>
            <h1 className="app-header" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2rem,5vw,3rem)',color:'var(--text)',fontWeight:300}}>
              Employment <em style={{fontStyle:'italic',color:'var(--gold)'}}>Application</em>
            </h1>
            <p style={{color:'var(--muted)',fontSize:'0.83rem',marginTop:12}}>
              1229 N Eastman Rd #225, Kingsport, TN 37664 · (423) 246-9682
            </p>
          </div>

          <div className="app-progress">
            <div className="progress-step">
              <div className={`progress-num ${formPage >= 1 && !submitted ? 'active' : submitted || formPage > 1 ? 'done' : ''}`}>1</div>
              <span className={`progress-label ${formPage === 1 && !submitted ? 'active' : ''}`}>Personal Info</span>
            </div>
            <div className="progress-line" />
            <div className="progress-step">
              <div className={`progress-num ${formPage === 2 && !submitted ? 'active' : submitted ? 'done' : ''}`}>2</div>
              <span className={`progress-label ${formPage === 2 && !submitted ? 'active' : ''}`}>Experience & Sign</span>
            </div>
          </div>

          <div className="app-form">

            {/* ====== PAGE 1 ====== */}
            <div className={`form-page ${formPage === 1 && !submitted ? 'active' : ''}`}>
              <div className="form-section-title">Personal Information</div>
              <p className="form-section-sub">All fields are required unless otherwise noted.</p>

              <div className="form-row">
                <div className="field">
                  <label>First Name</label>
                  <input type="text" placeholder="First name" value={form.firstName} onChange={e=>upd('firstName',e.target.value)} />
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input type="text" placeholder="Last name" value={form.lastName} onChange={e=>upd('lastName',e.target.value)} />
                </div>
              </div>

              <div className="form-row full">
                <div className="field">
                  <label>Street Address</label>
                  <input type="text" placeholder="123 Main St" value={form.address} onChange={e=>upd('address',e.target.value)} />
                </div>
              </div>

              <div className="form-row triple">
                <div className="field">
                  <label>City</label>
                  <input type="text" placeholder="Kingsport" value={form.city} onChange={e=>upd('city',e.target.value)} />
                </div>
                <div className="field">
                  <label>State</label>
                  <select value={form.state} onChange={e=>upd('state',e.target.value)}>
                    {["TN","VA","NC","KY","GA","AL","SC","MS","AR","MO","IN","OH","WV","PA","NY","FL","TX","CA","Other"].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Zip Code</label>
                  <input type="text" placeholder="37664" value={form.zip} onChange={e=>upd('zip',e.target.value)} />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="(423) 555-0000" value={form.phone} onChange={e=>upd('phone',e.target.value)} />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@email.com" value={form.email} onChange={e=>upd('email',e.target.value)} />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Date of Birth</label>
                  <input type="date" value={form.dob} onChange={e=>upd('dob',e.target.value)} />
                  <span className="field-hint">Must be 21+ to sell alcohol in Tennessee</span>
                </div>
                <div className="field">
                  <label>Are you 21 or older?</label>
                  <div className="radio-group" style={{marginTop:12}}>
                    {["Yes","No"].map(v=>(
                      <label className="radio-item" key={v}>
                        <input type="radio" name="over21" value={v} checked={form.over21===v} onChange={()=>upd('over21',v)} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="form-divider" />

              <div className="form-section-title">Position & Availability</div>
              <p className="form-section-sub">Let us know what you're looking for and when you can work.</p>

              <div className="form-row">
                <div className="field">
                  <label>Position Desired</label>
                  <select value={form.position} onChange={e=>upd('position',e.target.value)}>
                    <option value="">Select a position…</option>
                    <option>Sales Associate</option>
                    <option>Cashier</option>
                    <option>Stock / Inventory</option>
                    <option>Shift Supervisor</option>
                    <option>Assistant Manager</option>
                    <option>Any Available Position</option>
                  </select>
                </div>
                <div className="field">
                  <label>Employment Type</label>
                  <select value={form.hoursPerWeek} onChange={e=>upd('hoursPerWeek',e.target.value)}>
                    <option value="">Select…</option>
                    <option>Part-Time (under 30 hrs/wk)</option>
                    <option>Full-Time (30+ hrs/wk)</option>
                    <option>Either / Flexible</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Earliest Start Date</label>
                  <input type="date" value={form.startDate} onChange={e=>upd('startDate',e.target.value)} />
                </div>
              </div>

              <div className="field" style={{marginBottom:20}}>
                <label>Days Available (check all that apply)</label>
                <div className="checkbox-group" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:8}}>
                  {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d=>(
                    <label className="checkbox-item" key={d}>
                      <input type="checkbox" checked={form.availability.includes(d)} onChange={()=>toggleAvail(d)} />
                      <span>{d}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-nav">
                <button className="btn-form-back" onClick={()=>setPage('home')}>← Back to Site</button>
                <div className="page-indicator">Page 1 of 2</div>
                <button className="btn-form-next" onClick={()=>setFormPage(2)}>Next Page →</button>
              </div>
            </div>

            {/* ====== PAGE 2 ====== */}
            <div className={`form-page ${formPage === 2 && !submitted ? 'active' : ''}`}>
              <div className="form-section-title">Employment History</div>
              <p className="form-section-sub">List your two most recent employers. Include part-time, seasonal, and self-employment.</p>

              <div style={{background:'var(--bg)',padding:'20px 24px',marginBottom:20,borderLeft:'2px solid var(--gold-dim)'}}>
                <div style={{fontFamily:'Inter,sans-serif',fontSize:'0.65rem',letterSpacing:'0.25em',textTransform:'uppercase',color:'var(--gold)',marginBottom:12}}>Most Recent Employer</div>
                <div className="form-row">
                  <div className="field">
                    <label>Employer Name</label>
                    <input type="text" placeholder="Company name" value={form.prevEmployer1} onChange={e=>upd('prevEmployer1',e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Job Title</label>
                    <input type="text" placeholder="Your title" value={form.prevTitle1} onChange={e=>upd('prevTitle1',e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>Dates Employed</label>
                    <input type="text" placeholder="e.g. Jan 2022 – Mar 2024" value={form.prevDates1} onChange={e=>upd('prevDates1',e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Reason for Leaving</label>
                    <input type="text" placeholder="Brief reason" value={form.prevReason1} onChange={e=>upd('prevReason1',e.target.value)} />
                  </div>
                </div>
              </div>

              <div style={{background:'var(--bg)',padding:'20px 24px',marginBottom:20,borderLeft:'2px solid var(--border)'}}>
                <div style={{fontFamily:'Inter,sans-serif',fontSize:'0.65rem',letterSpacing:'0.25em',textTransform:'uppercase',color:'var(--muted)',marginBottom:12}}>Previous Employer</div>
                <div className="form-row">
                  <div className="field">
                    <label>Employer Name</label>
                    <input type="text" placeholder="Company name" value={form.prevEmployer2} onChange={e=>upd('prevEmployer2',e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Job Title</label>
                    <input type="text" placeholder="Your title" value={form.prevTitle2} onChange={e=>upd('prevTitle2',e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>Dates Employed</label>
                    <input type="text" placeholder="e.g. Jun 2019 – Dec 2021" value={form.prevDates2} onChange={e=>upd('prevDates2',e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Reason for Leaving</label>
                    <input type="text" placeholder="Brief reason" value={form.prevReason2} onChange={e=>upd('prevReason2',e.target.value)} />
                  </div>
                </div>
              </div>

              <hr className="form-divider" />

              <div className="form-section-title">Education</div>
              <div className="form-row triple">
                <div className="field">
                  <label>Highest Level</label>
                  <select value={form.education} onChange={e=>upd('education',e.target.value)}>
                    <option value="">Select…</option>
                    <option>Some High School</option>
                    <option>High School / GED</option>
                    <option>Some College</option>
                    <option>Associate's Degree</option>
                    <option>Bachelor's Degree</option>
                    <option>Graduate Degree</option>
                  </select>
                </div>
                <div className="field">
                  <label>Field / Major (optional)</label>
                  <input type="text" placeholder="e.g. Business" value={form.degree} onChange={e=>upd('degree',e.target.value)} />
                </div>
                <div className="field">
                  <label>Did You Graduate?</label>
                  <div className="radio-group" style={{marginTop:12}}>
                    {["Yes","No","In Progress"].map(v=>(
                      <label className="radio-item" key={v}>
                        <input type="radio" name="graduated" value={v} checked={form.graduated===v} onChange={()=>upd('graduated',v)} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="form-divider" />

              <div className="form-section-title">Spirits Knowledge</div>
              <p className="form-section-sub">We love enthusiasm — experts and beginners are both welcome to apply.</p>

              <div className="form-row full">
                <div className="field">
                  <label>Describe your knowledge of wine, beer, or spirits</label>
                  <textarea placeholder="Tell us what you know and love — whiskey regions, wine varietals, craft beer styles, anything goes…" value={form.spirits} onChange={e=>upd('spirits',e.target.value)} style={{minHeight:90}} />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Any Previous Retail / Liquor Store Experience?</label>
                  <div className="radio-group" style={{marginTop:12}}>
                    {["Yes","No"].map(v=>(
                      <label className="radio-item" key={v}>
                        <input type="radio" name="salesExp" value={v} checked={form.salesExp===v} onChange={()=>upd('salesExp',v)} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label>Specific Whiskey / Bourbon Experience?</label>
                  <div className="radio-group" style={{marginTop:12}}>
                    {["Yes","No","Learning"].map(v=>(
                      <label className="radio-item" key={v}>
                        <input type="radio" name="whiskeyExp" value={v} checked={form.whiskeyExp===v} onChange={()=>upd('whiskeyExp',v)} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="form-divider" />

              <div className="form-section-title">Background</div>
              <div className="field" style={{marginBottom:16}}>
                <label>Have you ever been convicted of a felony?</label>
                <div className="radio-group" style={{marginTop:12}}>
                  {["Yes","No"].map(v=>(
                    <label className="radio-item" key={v}>
                      <input type="radio" name="felony" value={v} checked={form.felony===v} onChange={()=>upd('felony',v)} />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
                <span className="field-hint">A conviction does not automatically disqualify you from employment.</span>
              </div>
              {form.felony === "Yes" && (
                <div className="form-row full">
                  <div className="field">
                    <label>Please explain (date, nature, disposition)</label>
                    <textarea value={form.felonyExplain} onChange={e=>upd('felonyExplain',e.target.value)} style={{minHeight:80}} />
                  </div>
                </div>
              )}

              <hr className="form-divider" />

              <div className="form-section-title">Certification & Signature</div>
              <div className="sig-box">
                <p className="disclaimer">
                  I certify that all information provided on this application is true and complete to the best of my knowledge. I understand that false or misleading information may result in the refusal of employment or, if employed, my immediate discharge. I authorize Greenacres Package Store to verify all information provided and to contact former employers and references listed herein.
                </p>
                <div className="form-row" style={{marginTop:24}}>
                  <div className="field">
                    <label>Printed Full Name</label>
                    <input type="text" placeholder="Print your full name" value={form.signature} onChange={e=>upd('signature',e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Date</label>
                    <input type="date" value={form.signDate} onChange={e=>upd('signDate',e.target.value)} />
                  </div>
                </div>
                <div className="sig-line">Applicant Signature (printed name serves as digital signature)</div>
              </div>

              <div className="field" style={{marginTop:24}}>
                <label className="checkbox-item">
                  <input type="checkbox" checked={form.agreeDisclosure} onChange={e=>upd('agreeDisclosure',e.target.checked)} />
                  <span style={{fontFamily:'Inter,sans-serif',fontSize:'0.88rem',color:'var(--muted)',fontWeight:300,lineHeight:1.6}}>
                    I understand and agree to the certification statement above and consent to a background check if required.
                  </span>
                </label>
              </div>

              <div className="form-nav">
                <button className="btn-form-back" onClick={()=>setFormPage(1)}>← Back</button>
                <div className="page-indicator">Page 2 of 2</div>
                <button
                  className="btn-form-next"
                  onClick={handleSubmit}
                  style={{opacity: form.agreeDisclosure && form.signature ? 1 : 0.5}}
                >
                  Submit Application ✓
                </button>
              </div>
            </div>

            {/* SUCCESS */}
            {submitted && (
              <div className="form-page active">
                <div className="success-box">
                  <div className="checkmark">🥃</div>
                  <h2>Application Received!</h2>
                  <p>
                    Thank you, {form.firstName}. Your application has been submitted to the Greenacres team.
                    We'll be in touch at <strong style={{color:'var(--gold)'}}>{form.phone || form.email}</strong> if your experience is a match for our current openings.
                    <br /><br />
                    <em>In the meantime, come visit us at 1229 N Eastman Rd — we'd love to meet you in person.</em>
                  </p>
                  <button className="btn-form-next" style={{marginTop:40}} onClick={()=>setPage('home')}>
                    ← Return to Store
                  </button>
                </div>
              </div>
            )}

          </div>

          <div style={{marginTop:32,textAlign:'center',fontFamily:'Inter,sans-serif',fontSize:'0.68rem',color:'var(--muted)',letterSpacing:'0.25em',fontWeight:300}}>
            GREENACRES PACKAGE STORE · KINGSPORT, TN · (423) 246-9682
          </div>
        </div>
      )}
    </>
  );
}