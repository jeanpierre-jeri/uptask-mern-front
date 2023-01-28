export const cleanFormInputs = (form) => {
  for (const item of form.children) {
    if (!item.children.length) continue

    item.children[1].value = ''
  }
}
