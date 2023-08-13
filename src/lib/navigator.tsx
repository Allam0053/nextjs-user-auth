export const handleChangeFocusTextInputCallback = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (event.key === 'Tab') {
    console.log('tab is clicked');
    return;
  }
  if (event.key === 'Enter') {
    event.preventDefault();

    const currentInput = event.target as HTMLInputElement;
    const inputs = Array.from(
      document.querySelectorAll('input')
    ) as HTMLInputElement[];
    const currentIndex = inputs.indexOf(currentInput);

    if (event.shiftKey) {
      // Move focus to the previous input when Shift + Tab is pressed
      const previousIndex = (currentIndex - 1 + inputs.length) % inputs.length;
      inputs[previousIndex].focus();
    } else {
      // Move focus to the next input when Enter is pressed
      const nextIndex = (currentIndex + 1) % inputs.length;
      inputs[nextIndex].focus();
    }
    return;
  }
};
