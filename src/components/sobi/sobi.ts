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

// Module-level Rive instance reference populated by Sobi.astro after load.
let _inputs: RiveInput[] | null = null;
let _pendingState: SobiState | null = null;

function findInput(name: string): RiveInput | undefined {
  return _inputs?.find((i) => i.name === name);
}

function applyState(state: SobiState): void {
  if (!_inputs) {
    // Queue the request; will be applied once Rive loads.
    _pendingState = state;
    return;
  }

  // Clear all booleans first.
  const isListening = findInput('isListening');
  const isThinking = findInput('isThinking');
  const isSpeaking = findInput('isSpeaking');

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
      const greet = findInput('greet');
      if (greet?.fire) greet.fire();
      break;
    }
    case 'success': {
      const celebrate = findInput('celebrate');
      if (celebrate?.fire) celebrate.fire();
      break;
    }
    case 'error': {
      const showError = findInput('showError');
      if (showError?.fire) showError.fire();
      break;
    }
    case 'idle':
    default:
      // All booleans already cleared above.
      break;
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
 * Called by Sobi.astro once Rive has loaded and inputs are available.
 * Replays any pending state that arrived before load completed.
 */
export function registerSobiInputs(inputs: RiveInput[]): void {
  _inputs = inputs;
  if (_pendingState !== null) {
    const queued = _pendingState;
    _pendingState = null;
    applyState(queued);
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
