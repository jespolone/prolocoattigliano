// Data odierna (YYYY-MM-DD, fuso Europe/Rome). TODAY=YYYY-MM-DD forza un valore per i test.
module.exports =
  process.env.TODAY ||
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(new Date());
