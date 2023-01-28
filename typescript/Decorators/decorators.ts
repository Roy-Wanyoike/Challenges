const defaultGun = (gun: Function) => class extends gun {
    ammo = 12
}
@defaultGun 
class Gun {

}

const gun = new Gun()
console.log(gun)