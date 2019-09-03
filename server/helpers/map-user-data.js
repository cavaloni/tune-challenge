module.exports = {
  mapUserData: (users, logs) => {
    let logsIndex = 0;
    return users.map(user => {
      let impressions = 0;
      let conversions = 0;
      let revenue = 0;
      const conversionDates = {};

      // This loop iterates over the logs for the current user
      // Since its sorted it doesn't have to search
      // just increment when it no longer matches the current user id

      // Also to note is that normally there should be better tracking of dates
      // but since the date range data seems limited for this exercise
      // that processing step is ommited (which may actually be a FE process too)
      while (logs[logsIndex] && user.id === logs[logsIndex].user_id) {
        if (logs[logsIndex].type === "impression") impressions += 1;
        else if (logs[logsIndex].type === "conversion") {
          conversions += 1;
          const day = logs[logsIndex].time.split(" ")[0];
          if (conversionDates[day]) conversionDates[day] += 1;
          else conversionDates[day] = 1;
        }
        revenue += logs[logsIndex].revenue;
        logsIndex += 1;
      }
      return {
        ...user,
        impressions,
        conversions,
        revenue,
        conversionDates
      };
    });
  }
};
