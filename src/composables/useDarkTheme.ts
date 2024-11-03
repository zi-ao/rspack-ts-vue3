const useDarkTheme = () => {
  const darkTheme = inject('APP_DARK_THEME');
  if (darkTheme) {
    return darkTheme;
  }

  const isDark = ref(false);
  const toggleDark = useToggle(isDark);
  return { isDark, toggleDark };
};

export default useDarkTheme;
