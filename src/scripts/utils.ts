export function isMobileTouchDevice() {
  // 1. Comprobamos si el hardware soporta toques (Pantalla táctil)
  const hasTouchScreen = (
    'ontouchstart' in window || 
    navigator.maxTouchPoints > 0
  );

  if (!hasTouchScreen) return false;

  // 2. Comprobamos si el sistema operativo se identifica como móvil o tablet
  // Esto es vital para descartar Laptops con Windows/ChromeOS que tienen pantalla táctil
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(navigator.userAgent);

  // 3. El caso especial de Apple: Los iPads modernos dicen ser "Macs" en su User Agent.
  // Pero sabemos que si dice ser un Mac y tiene pantalla táctil, es 100% un iPad.
  const isModernIPad = (navigator.userAgent.includes("Mac") && navigator.maxTouchPoints > 1);

  // Retornamos true solo si tiene pantalla táctil Y además es un entorno móvil/tablet
  return isMobileUserAgent || isModernIPad;
}