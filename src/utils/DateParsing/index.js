export const dateParsing = (date) => new Date(date).toLocaleDateString('id-ID', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
