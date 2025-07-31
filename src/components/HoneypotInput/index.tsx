export function HoneypotInput() {
  return (
    <input
      className='niceInput'
      name='dateUpdatedAt'
      type='text'
      tabIndex={-1}
      autoComplete='new-password'
      defaultValue={''}
    />
  );
}
