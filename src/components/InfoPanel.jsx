import { useLayoutEffect, useRef, useState } from 'react';
import { animatePanelIn, animatePanelOut } from '../utils/animations.js';
import './InfoPanel.css';

function AboutContent() {
  return (
    <>
      <h3>More About Me</h3>
      <p>
        I&apos;m an Expert Tool Engineer with 20 years of experience across the aerospace and
        automotive industries, working with major OEMs and Tier-1 suppliers worldwide. I use
        Catia V5 and NX Unigraphics with PLM to develop mechanisms, tooling, interiors and
        products in composite, metallic, injection-molded and additive manufacturing processes.
      </p>
      <p>
        I care about design-to-cost thinking, continuous improvement and staying close to the
        shop floor as a liaison during manufacture and assembly try-outs. Outside of work I&apos;m
        passionate about travel and camper/RV design, and I&apos;m an amateur musician with three
        authorial albums released over ten years with a Brazilian band.
      </p>
    </>
  );
}

function ContactContent() {
  return (
    <>
      <h3>Contact</h3>
      <dl className="info-panel__contact">
        <div>
          <dt>Name</dt>
          <dd>Joao Rodrigo Muniz de Faria</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>Expert Tool Engineer</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>Ried im Innkreis, Austria</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>
            <a href="tel:+436776483114">+43 677 648 31144</a>
          </dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <a href="mailto:joao.y2k@gmail.com">joao.y2k@gmail.com</a>
          </dd>
        </div>
        <div>
          <dt>LinkedIn</dt>
          <dd>
            <a href="https://linkedin.com/in/joao-rodrigo-faria" target="_blank" rel="noreferrer">
              linkedin.com/in/joao-rodrigo-faria
            </a>
          </dd>
        </div>
      </dl>
    </>
  );
}

function InfoPanel({ type, onClose }) {
  const closeButtonRef = useRef(null);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    animatePanelOut(backdropRef.current, panelRef.current, onClose);
  };

  useLayoutEffect(() => {
    closeButtonRef.current?.focus();
    animatePanelIn(backdropRef.current, panelRef.current);

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        requestClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="info-panel-backdrop"
      role="presentation"
      onClick={requestClose}
      ref={backdropRef}
    >
      <div
        className="info-panel"
        role="dialog"
        aria-modal="true"
        aria-label={type === 'about' ? 'More about me' : 'Contact information'}
        onClick={(event) => event.stopPropagation()}
        ref={panelRef}
      >
        <button
          type="button"
          className="info-panel__close"
          onClick={requestClose}
          aria-label="Close panel"
          ref={closeButtonRef}
        >
          ×
        </button>
        {type === 'about' ? <AboutContent /> : <ContactContent />}
      </div>
    </div>
  );
}

export default InfoPanel;
