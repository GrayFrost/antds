<script context="module">
  const customCache = new Set();

  export function createFromIconfontScriptCN(options = {}) {
    const { scriptUrl } = options;
    /**
     * DOM API required.
     * Make sure in browser environment.
     * The Custom Icon will create a <script/>
     * that loads SVG symbols and insert the SVG Element into the document body.
     */
    if (typeof document !== 'undefined' && typeof window !== 'undefined'
      && typeof document.createElement === 'function'
      && typeof scriptUrl === 'string' && scriptUrl.length
      && !customCache.has(scriptUrl)
    ) {
      const script = document.createElement('script');
      script.setAttribute('src', `https:${scriptUrl}`);
      script.setAttribute('data-namespace', scriptUrl);
      customCache.add(scriptUrl);
      document.body.appendChild(script);
    }
  }
</script>

<script>
  import Icon from './icon.svelte';
  export let type;
  export let style = {};
</script>

<Icon style={style}>
  <use slot="only-path" xlink:href={`#${type}`} />
</Icon>