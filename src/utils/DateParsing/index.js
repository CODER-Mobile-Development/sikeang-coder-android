export const dateParsing = (date) => new Date(date).toLocaleDateString('id-ID', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const dateTimeParsing = (date) => `${new Date(date).toLocaleDateString('id-ID', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})} - ${new Date(date).toLocaleTimeString('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
})}`;
