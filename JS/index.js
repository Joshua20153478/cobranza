let bd = JSON.parse(localStorage.getItem("miBDp"));
let C1= new charge("Andrew Joshua Craig Montiel",500);
if(!bd || bd==undefined)
{
  bd={
    login:"",
    users:{
      prop:[{Nombre: "Humberto Ramirez Gonzales",Telefono: 3122706630,Correo:"raghum76@ucol.mx",Password:"admin"}],
      user:[{Nombre: "Andrew Joshua Craig Montiel",Telefono: 3143533373,Correo:"acraig@ucol.mx",Password:"1234"}]
    },
    charges:[],
    payments:[]
  };
  bd.charges.push(C1);
  localStorage.setItem("miBDp",JSON.stringify(bd));
  console.log("Base de datos creada correctamente");
}

document.getElementById("ingresar").addEventListener("click",()=>{
  if(login())
  {
    bd.login=document.getElementById("Telefono").value;
    localStorage.setItem("miBDp",JSON.stringify(bd));
    location.replace("propietario.html");
  }
  else
  {
    if(login2())
    {
      bd.login=document.getElementById("Telefono").value;
      localStorage.setItem("miBDp",JSON.stringify(bd));
      location.replace("usuario.html");
    }
    else
    {
      alert("La contraseña o el telefono esta mal.");
    }
  }
});


function login(){
  let valid1=false;
  bd.users.prop.forEach(element => {
    if(element.Telefono==document.getElementById("Telefono").value&&element.Password==document.getElementById("Password").value)
    {
      valid1 = true;
    }
    else
    {
      valid1 = false;
    }
  });
  return valid1;
}

function login2(){
  let valid2=false;
  bd.users.user.forEach(element => {
    if(element.Telefono==document.getElementById("Telefono").value&&element.Password==document.getElementById("Password").value)
    {
      console.log(element);
      valid2 = true;
    }
  });
  return valid2;
}


document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("ingresar").click();
  }
});