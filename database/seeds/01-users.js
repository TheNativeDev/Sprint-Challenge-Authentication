exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
          
        {
          username: 'bobby',
          password: 1234
       },

        { 
          username: 'sarai',
          password:'abc'
      },
        
      ]);
    });
};