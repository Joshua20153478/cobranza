class user{
  constructor(name,tel,mail,pwd)
  {
    this.Nombre = name;
    this.Telefono = tel;
    this.Correo = mail;
    this.Password = pwd;
  }
}

class charge{
  state=false;
  constructor(users,amount)
  {
    this.Nombre = users;
    this.amount = amount;
  }
}

class pay{
  constructor(user, amount, date)
  {
    this.Nombre = user;
    this.amount = amount;
    this.date = date;
  }
}