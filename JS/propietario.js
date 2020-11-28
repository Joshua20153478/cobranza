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

if(validpageloadlogin(bd.login)==true)
{

}
else
{
  location.replace("index.html");
}

function validpageloadlogin(info){
  let valid1=false;
  bd.users.prop.forEach(element => {
    if(info==element.Telefono)
    {
      valid1=true;
    }
  });
  return valid1;
}


let cont=0;
function loadinfo(){


  document.getElementById("CobroAUsuarios").innerHTML="";
  let i=0;
  cont=0;

  if(contarUsuarios()>1)
    {
    document.getElementById("CobroAUsuarios").innerHTML=`
    <input type="checkbox" id="CALL" value="All" onchange="VALIDALL()">
    <label>Todos Los Usuarios</label><br>`;
  }

  let usuarios = JSON.parse(localStorage.getItem("miBDp"));
  usuarios.users.user.forEach(element=>{
    document.getElementById("CobroAUsuarios").innerHTML+=`
    <input type="checkbox" id="${"USER"+i}" value="${element.Nombre}">
    <label>${element.Nombre}</label><br>`;
    i++;
    cont++;
  });

  document.getElementById("ListUsers").innerHTML=`
    <option value="Nobody">opciones</option>
  `;

  usuarios.users.user.forEach(element=>{
    document.getElementById("ListUsers").innerHTML+=`
    <option value="${element.Nombre}">${element.Nombre}</option>`;
  });

  MontoTotal();
  document.getElementById("PayInfo").innerHTML=``;

  document.getElementById("ListUsers2").innerHTML=`
    <option value="ALL">TODOS</option>
  `;

  usuarios.users.user.forEach(element=>{
    document.getElementById("ListUsers2").innerHTML+=`
    <option value="${element.Nombre}">${element.Nombre}</option>`;
  });
}

function contarUsuarios(){
  document.getElementById("CobroAUsuarios").innerHTML="";
  let usuarios = JSON.parse(localStorage.getItem("miBDp"));
  let x =usuarios.users.user.length;
  return x;
}

document.getElementById("CloseSesion").addEventListener("click",()=>{
  bd.login = "";
  localStorage.setItem("miBDp",JSON.stringify(bd));
});



document.getElementById("NewUserBtn").addEventListener("click",()=>{
  let validTel=false;
  let NameNew=document.getElementById("NombreNew").value;
  let TelNew=document.getElementById("TelefonoNew").value;
  let MailNew=document.getElementById("CorreoNew").value;
  let PwdNew=document.getElementById("PasswordNew").value;

  if(NameNew==""||TelNew==""||MailNew==""||PwdNew=="")
  {
    alert("¡Rellena todos los campos!");
  }
  else
  {
    bd.users.user.forEach(element=>{
      if(element.Telefono==TelNew)
      {
        validTel=true;
      }
    });

    if(validTel==true)
    {
      alert("Ya existe el número de telefono que usted ingreso");
    }
    else
    {
      let NewUser = new user(NameNew,TelNew,MailNew,PwdNew);
      bd.users.user.push(NewUser);
      localStorage.setItem("miBDp",JSON.stringify(bd));
      loadinfo();

      alert("Nuevo usuario ingresado");
    }

    document.getElementById("NombreNew").value="";
    document.getElementById("TelefonoNew").value="";
    document.getElementById("CorreoNew").value="";
    document.getElementById("PasswordNew").value="";
  }
});

let onevaliduser=false;
function onevalid()
{
  for(i=0;i<cont;i++)
  {
    if(document.getElementById("USER"+i).checked)
    {
      onevaliduser=true;
      break;
    }
  }
}


function VALIDALL(){
  document.getElementById("CobroAUsuarios").innerHTML="";

  document.getElementById("CobroAUsuarios").innerHTML+=`
  <input type="checkbox" id="CALL" value="All" onchange="loadinfo()" checked>
  <label>Todos Los Usuarios</label><br>`;
}

document.getElementById("CrearCobroBtn").addEventListener("click",()=>{
  let cantidad=document.getElementById("CCantidad").value;
  let CALLV=false;

  if(document.getElementById("CALL")==undefined)
  {
    
  }
  else
  {
    CALLV=true;
  }

  if(cantidad==""||cantidad==0||cantidad=="0")
  {
    alert("Ingrese una cantidad");
  }
  else
  {
    console.log("Entré"+CALLV)
      if(CALLV==true)
      {
        if(document.getElementById("CALL").checked)
        {
          bd.users.user.forEach(element=>{
            let x = new charge(element.Nombre,parseInt(cantidad));
            bd.charges.push(x);
          });
        
          localStorage.setItem("miBDp",JSON.stringify(bd));
        
          alert("Se han cargado los nuevos cobros a todos los usuarios");
          document.getElementById("CCantidad").value="";
          loadinfo();
        }
        else
        {
          onevalid();
          if(onevaliduser==true)
          {
            for(i=0;i<cont;i++)
            {
              if(document.getElementById("USER"+i).checked)
              {
                let z = new charge(document.getElementById("USER"+i).value,parseInt(cantidad));
                bd.charges.push(z);
              }
            }
            alert("Se han cargado los nuevos cobros a todos los usuarios seleccionados");
            localStorage.setItem("miBDp",JSON.stringify(bd));
            document.getElementById("CCantidad").value="";
            loadinfo();
          }
          else
          {
            alert("Seleccione al menos a un ususario")
          }
        }
        
      }
      else
      {
        onevalid();
        if(onevaliduser==true)
        {
          for(i=0;i<cont;i++)
          {
            if(document.getElementById("USER"+i).checked)
            {
              let z = new charge(document.getElementById("USER"+i).value,parseInt(cantidad));
              bd.charges.push(z);
            }
          }
          alert("Se han cargado los nuevos cobros a todos los usuarios seleccionados");
          localStorage.setItem("miBDp",JSON.stringify(bd));
          document.getElementById("CCantidad").value="";
          loadinfo();
        }
        else
        {
          alert("Seleccione al menos a un ususario")
        }
      }
  }
  document.getElementById("CCantidad").value="";
  onevaliduser=false;
});

  loadinfo();

  let usuarioseleccionado1;
  let restar = 0;

  document.getElementById("ListUsers").addEventListener("change",()=>{
    if(document.getElementById("ListUsers").value=="Nobody")
    {
      document.getElementById("PayInfo").innerHTML=``;
    }
    else
    {
      document.getElementById("NewPayBtn").disabled=false;
      let i=0;
      let usuarioseleccionado2 = document.getElementById("ListUsers").value;

      document.getElementById("PayInfo").innerHTML=`
      <p>Usuario: ${usuarioseleccionado2}</p>
      <label>Cantidad de dinero pagado por el usuario:</label>
      <input type="number" id="PCantidad" placeholder="0">
      <br>
      `;
      usuarioseleccionado1=usuarioseleccionado2;
    }
  });

  document.getElementById("NewPayBtn").addEventListener("click",()=>{
    let PCantidad = document.getElementById("PCantidad").value;
    let date = new Date();
    let datepayment = date.getFullYear()+"-"+(1+date.getMonth())+"-"+date.getDate();
    if(document.getElementById("PCantidad").value=="")
    {
      alert("Ingrese la cantidad del pago");
      document.getElementById("NewPayBtn").disabled=true;
    }
    else
    {
      if(VALIDPCANTIDAD()-(VALIDPCANTIDAD2()+parseFloat(PCantidad))==0||VALIDPCANTIDAD()-(VALIDPCANTIDAD2()+parseFloat(PCantidad))>0)
      {
        let NewPay = new pay(usuarioseleccionado1,PCantidad,datepayment);
        bd.payments.push(NewPay);
        localStorage.setItem("miBDp",JSON.stringify(bd));
        document.getElementById("NewPayBtn").disabled=true;
        alert("Pago realizado correctamente");
      }
      else
      {
        alert("Ingrese un pago que pague el total de la deuda");
      }
    }
    loadinfo();
  });


function VALIDPCANTIDAD()
{
  let montodeuda=0;
  bd.users.user.forEach(element=>{
    bd.charges.forEach(element3=>{
      if(element.Nombre==element3.Nombre)
      {
        montodeuda += parseFloat(element3.amount);
      }
    });
  });
  return parseFloat(montodeuda);
}

function VALIDPCANTIDAD2()
{
  let montopagado=0;
  bd.users.user.forEach(element=>{
    bd.payments.forEach(element3=>{
      if(element.Nombre==element3.Nombre)
      {
        montopagado += parseFloat(element3.amount);
      }
    });
  });
  return parseFloat(montopagado);
}

function MontoTotal(){
  document.getElementById("Montoinfo").innerHTML ="";
  let montodeuda=0;
  let montopagado=0;

  bd.users.user.forEach(element=>{
    bd.payments.forEach(element2=>{
      if(element.Nombre==element2.Nombre)
      {
        montopagado += parseFloat(element2.amount);
      }
    });

    bd.charges.forEach(element3=>{
      if(element.Nombre==element3.Nombre)
      {
        montodeuda += parseFloat(element3.amount);
      }
    });
    document.getElementById("Montoinfo").innerHTML += `
    <div class="CARDMI">
      <p>Usuario: ${element.Nombre}</p>
      <p>Total en deudas: $${montodeuda-montopagado}</p>
      <p>Total pagado: $${montopagado}</p>
    </div>
    `;
    montodeuda=0;
    montopagado=0;
  });
}

document.getElementById("BtnConsultar").addEventListener("click",()=>
{
  if(document.getElementById("ListUsers2").value=="ALL")
  {
    if(bd.payments.length==0)
    {
      document.getElementById("FechaPagoInfo").innerHTML=`
      <div class="DivPagoCard">
        <p>NO HAY PAGOS REGISTRADOS</p>
      </div>`;
    }
    else
    {
      if(document.getElementById("ObtPagosDate").value=="")
      {
        alert("Ingrese una fecha");
      }
      else
      {
        document.getElementById("FechaPagoInfo").innerHTML="";
        bd.payments.forEach(element=>{
          if(element.date==document.getElementById("ObtPagosDate").value)
          {
            document.getElementById("FechaPagoInfo").innerHTML+=`
            <div class="CARDMI">
              <p>------------------------------</p>
              <p>Fecha: ${element.date}</p>
              <p>Usuario: ${element.Nombre}</p>
              <p>------------------------------</p>
              <p>Cantidad pagada: $${element.amount};
            </div>
            `;
          }
        });
      }
    }
  }
  else
  {
    if(bd.payments.length==0)
    {
      document.getElementById("FechaPagoInfo").innerHTML=`
      <div class="DivPagoCard">
        <p>NO HAY PAGOS REGISTRADOS</p>
      </div>`;
    }
    else
    {
      if(document.getElementById("ObtPagosDate").value=="")
      {
        alert("Ingrese una fecha");
      }
      else
      {
        document.getElementById("FechaPagoInfo").innerHTML="";
        bd.payments.forEach(element=>{
          if(element.date==document.getElementById("ObtPagosDate").value&&element.Nombre==document.getElementById("ListUsers2").value)
          {
            document.getElementById("FechaPagoInfo").innerHTML+=`
            <div class="DivPagoCard">
              <p>------------------------------</p>
              <p>Fecha: ${element.date}</p>
              <p>Usuario: ${element.Nombre}</p>
              <p>------------------------------</p>
              <p>Cantidad pagada: $${element.amount};
            </div>
            `;
          }
        });
      }
    }
  }
});