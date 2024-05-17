export const askToConfirmUserAboutRemovalOfEnteredText = (text: string, isSelectedTodoChanged: boolean) => {
  const isInputEmpty = !text;
  console.log('> ConfirmUtils -> askToConfirmUserAboutRemovalOfEnteredText:', isSelectedTodoChanged);
  return isInputEmpty || (!isInputEmpty && !isSelectedTodoChanged) || (!isInputEmpty && confirm('Text you have entered will be removed. Do you want to continue?'));
};
