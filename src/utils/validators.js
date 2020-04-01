// @flow

function validateTitle(title: string) {
  if (!title) return 'Required';
  if (title?.length <= 1) return 'Too short!';
  if (title?.length >= 256) return 'Too long!';
  return null;
}

function validateDescription(description: string) {
  if (!!description && description?.length >= 512) return 'Too long!';
  return null;
}

function validatePrice(price: string) {
  if (!price) return 'Required';
  if (Number.isNaN(parseInt(price, 10))) return 'Price must be a number!';
  if (parseInt(price, 10) <= 0) return 'Price must be positive';
  return null;
}

export { validateTitle, validateDescription, validatePrice };
