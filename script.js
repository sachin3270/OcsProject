
const { createClient } = supabase;
  
document.addEventListener('DOMContentLoaded', async function () {
  const supabaseUrl = 'https://ettldmnlhlytrjavmpmt.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dGxkbW5saGx5dHJqYXZtcG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5OTYxNTAsImV4cCI6MjAyMjU3MjE1MH0.J9YoAtB7BHe6t9t8do0zlLHp9468akRJ3NQb4PcwcPk'; // Set your Supabase key here

  const supabase = createClient(supabaseUrl, supabaseKey);

  async function getData() {
    try {
      let { data: users, error } = await supabase.from('users').select('*');

      if (error) {
        console.error(error);
      } else {
        return users;
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  var submit = document.getElementById('submit-button');
  submit.addEventListener('click', async function () {
    var username_elem = document.getElementById('username');
    var username = username_elem.value;

    var password_elem = document.getElementById('password');
    var password = password_elem.value;

    try {
      const data = await getData();

      const hashed_pwd = CryptoJS.MD5(password)

      console.log(data);

      for (var i = 0; i < data.length; i++)
      {
        if (data[i].userid == username)
        {
          if (data[i].hashed_password == hashed_pwd)
          {
            if (data[i].role == "admin")
            {
              console.log(data);
            }
            else
            {
              console.log(data[i]);
            }
            return;
          }
          else
          {
            console.log("Incorrect Password");
            return;
          }
        }
      }
      console.log("User does not exist");
    }
     catch (error) {
      console.error(error.message);
    }
  });
});
