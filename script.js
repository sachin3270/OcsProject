const { createClient } = supabase;
  
document.addEventListener('DOMContentLoaded', async function () {
  const supabaseUrl = 'https://ettldmnlhlytrjavmpmt.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dGxkbW5saGx5dHJqYXZtcG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5OTYxNTAsImV4cCI6MjAyMjU3MjE1MH0.J9YoAtB7BHe6t9t8do0zlLHp9468akRJ3NQb4PcwcPk';

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

      for (var i = 0; i < data.length; i++)
      {
        if (data[i].userid == username)
        {
          if (data[i].password_hash == hashed_pwd)
          {
            if (data[i].role == "admin")
            {
              window.location.href = 'admin.html';
              return;
            }
            else
            {
              var toDisplay = JSON.stringify(data[i],null, 2);
              alert(toDisplay);
            }
            return;
          }
          else
          {
            alert("Incorrect Password");
            return;
          }
        }
      }
      alert("User does not exist");
    }
     catch (error) {
      console.error(error.message);
    }
  });
});
