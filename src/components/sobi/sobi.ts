/**
 * Sobi state controller
 *
 * State priority (highest to lowest):
 *   speaking > thinking > listening > greeting/success/error (triggers) > idle
 *
 * Exposes:
 *   window.setSobiState(state)
 *   CustomEvent 'sobi:state' with detail = state string
 *   window.__sobiUpdateBubble(state) — set by SobiLauncher to update speech bubble text
 *
 * Supports multiple Sobi instances on the same page. Every Rive canvas that
 * loads successfully registers its inputs via registerSobiInputs(); setSobiState
 * then drives ALL registered instances simultaneously.
 */

export type SobiState =
  | 'idle'
  | 'greeting'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'success'
  | 'error';

type RiveInput = {
  name: string;
  value: boolean | number;
  fire?: () => void;
};

// Registry of all loaded Rive input sets — one entry per Sobi instance.
const _registry: RiveInput[][] = [];
let _pendingState: SobiState | null = null;

function findInput(inputs: RiveInput[], name: string): RiveInput | undefined {
  return inputs.find((i) => i.name === name);
}

function applyStateToInputs(inputs: RiveInput[], state: SobiState): void {
  // Clear all boolean flags first.
  const isListening = findInput(inputs, 'isListening');
  const isThinking = findInput(inputs, 'isThinking');
  const isSpeaking = findInput(inputs, 'isSpeaking');

  if (isListening) isListening.value = false;
  if (isThinking) isThinking.value = false;
  if (isSpeaking) isSpeaking.value = false;

  switch (state) {
    case 'listening':
      if (isListening) isListening.value = true;
      break;
    case 'thinking':
      if (isThinking) isThinking.value = true;
      break;
    case 'speaking':
      if (isSpeaking) isSpeaking.value = true;
      break;
    case 'greeting': {
      const greet = findInput(inputs, 'greet');
      if (greet?.fire) greet.fire();
      break;
    }
    case 'success': {
      const celebrate = findInput(inputs, 'celebrate');
      if (celebrate?.fire) celebrate.fire();
      break;
    }
    case 'error': {
      const showError = findInput(inputs, 'showError');
      if (showError?.fire) showError.fire();
      break;
    }
    case 'idle':
    default:
      // All booleans already cleared above.
      break;
  }
}

function applyState(state: SobiState): void {
  if (_registry.length === 0) {
    // Queue the request; will be applied once the first Rive instance loads.
    _pendingState = state;
    return;
  }

  // Drive every registered instance.
  for (const inputs of _registry) {
    applyStateToInputs(inputs, state);
  }

  // Update speech bubble if the launcher registered its updater.
  const bubbleText: Record<SobiState, string> = {
    idle: 'Siap membantu!',
    greeting: 'Halo, warga!',
    listening: 'Sobi mendengarkan...',
    thinking: 'Sobi sedang berpikir...',
    speaking: '...',
    success: 'Berhasil!',
    error: 'Maaf, ada kendala.',
  };

  if (typeof window.__sobiUpdateBubble === 'function') {
    window.__sobiUpdateBubble(bubbleText[state] ?? 'Siap membantu!');
  }
}

/**
 * Called by each Sobi.astro instance once its Rive has loaded and inputs are
 * available. Replays any pending state that arrived before the first load.
 */
export function registerSobiInputs(inputs: RiveInput[]): void {
  _registry.push(inputs);
  if (_pendingState !== null) {
    const queued = _pendingState;
    _pendingState = null;
    // Apply to the newly registered instance (others already received it via
    // applyState at registration time or had no pending state).
    applyStateToInputs(inputs, queued);
  }
}

// Attach to window so Task 11 (and the browser console) can call it.
if (typeof window !== 'undefined') {
  window.setSobiState = applyState;

  window.addEventListener('sobi:state', (e: Event) => {
    const detail = (e as CustomEvent<SobiState>).detail;
    if (detail) applyState(detail);
  });
}

// TypeScript global augmentation so window.setSobiState / window.__sobiUpdateBubble are typed.
declare global {
  interface Window {
    setSobiState?: (state: SobiState) => void;
    /** Registered by SobiLauncher to update speech bubble DOM */
    __sobiUpdateBubble?: (text: string) => void;
    /** Registered by Task 11 chat panel */
    openSobiChat?: () => void;
  }
}
