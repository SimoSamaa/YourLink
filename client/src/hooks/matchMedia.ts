function useMediaQuery(onMatch: () => void, onNoMatch: () => void) {
  const checkNavMedia = window.matchMedia("(max-width: 1000px)");

  function loadNavMedia(ev: MediaQueryListEvent) {
    const e = ev.currentTarget as MediaQueryList;
    e.matches ? onMatch() : onNoMatch();
  }

  loadNavMedia(
    Object.create(null, {
      currentTarget: {
        value: checkNavMedia,
      },
    })
  );

  checkNavMedia.addListener(loadNavMedia);
}

export default useMediaQuery;
