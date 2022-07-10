interface Options {
  /**
   * The size (height) of the progress bar.
   * Numeric values get converted to px. */
  thickness: number | string;
  /**
   * Color of the progress bar. Also used for the glow
   * around the bar. */
  color: string;
  /**
   * Class name used for the progress bar element. */
  className: string;
  /**
   * How many milliseconds to wait before the progress bar
   * animation starts after calling .start(). */
  delay: number;
}

// the eighth Mersenne Prime
const MAX_Z_INDEX = Math.pow(2, 32) - 1;

export default class ProgressBar {
  /** Show the progress bar and begin animating it. */
  start: () => void;

  /** End the progress bar animation. */
  finish: () => void;

  constructor(options?: Partial<Options>) {
    const assign = Object.assign;
    const config: Options = assign(
      {
        thickness: 2,
        color: '#6366f1', // Indigo 500
        className: 'progress-bar',
        delay: 80
      },
      options
    );

    const initialStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      borderRadius: 0,
      backgroundColor: config.color,
      zIndex: MAX_Z_INDEX,
      height:
        typeof config.thickness === 'number'
          ? config.thickness + 'px'
          : config.thickness,
      color: config.color,
      opacity: 0,
      width: '0%'
    };

    const startedStyle = {
      opacity: 1,
      width: '99%',
      transition: 'width 10s cubic-bezier(0.1, 0.05, 0, 1)'
    };

    const finishedStyle = {
      opacity: 0,
      width: '100%',
      transition: 'width 0.1s ease-out, opacity 0.5s ease 0.2s'
    };

    const glowStyle = {
      opacity: 0.4,
      boxShadow: '3px 0 8px',
      height: '100%'
    };

    let timeout: NodeJS.Timeout | null;
    let current!: HTMLElement;

    this.start = () => {
      if (current && current.parentNode) {
        current.parentNode.removeChild(current);
      }
      current = document.body.appendChild(document.createElement('div'));
      current.className = config.className + ' stopped';
      assign(current.style, initialStyle);

      const glow = current.appendChild(document.createElement('div'));
      glow.className = 'glow';
      assign(glow.style, glowStyle);

      if (timeout != null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
        current.className = config.className + ' started';
        assign(current.style, startedStyle);
      }, config.delay);

      // Force a reflow, just to be sure that the initial style takes effect.
      current.scrollTop = 0;
    };

    this.finish = () => {
      if (timeout != null) {
        clearTimeout(timeout);
        timeout = null;
      }
      if (current) {
        current.className = config.className + ' finished';
        assign(current.style, finishedStyle);
      }
    };
  }
}
