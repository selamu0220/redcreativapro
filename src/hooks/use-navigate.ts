export function useNavigate() {
  return {
    push: (path: string) => {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    },
  };
}