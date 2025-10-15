export const scrollToBottom = (scrollAreaRef: React.RefObject<HTMLDivElement>) => {
  if (scrollAreaRef.current) {
    const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }
};