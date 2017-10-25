
function UserController() {
    this.UserController();
}

UserController.prototype = {
    UserController: function () {

    },
    login: function (userName, password) {
        Proxy.login(userName, password, this.storeUser,this.loadUser);
    },
    storeUser: function (user) {
        //sotrage*******************************************
        var storage = {};
        storage.user = user;
        Storage.store("user", storage);

        console.log("se almaceno el usuario correctamente en el localStorage");
        console.log(user);

    },
    loadUser: function () {
        var storage = {};
        //sotrage*******************************************
        storage = Storage.retrieve("user");
        if (storage == null) {
            storage = {};
            Storage.store("user", storage);
            window.location.href = "index.jsp";
        }
        //sotrage*******************************************
        
        if (storage.user instanceof User) {
            if (storage.user.esAdministrador)
                window.location.href = "admin.jsp";
            else
                window.location.href = "user.jsp";
        } else if (storage.user instanceof Driver) {
            window.location.href = "driver.jsp";
        }

    },
    logOut: function () {
        var storage;
        //sotrage*******************************************
        storage = Storage.retrieve("user");
        if (storage == null) {
            storage = {};
            Storage.store("user", storage);
        }
        //sotrage*******************************************
        delete storage.user;
        Storage.store("user", storage);

        swal({
            title: 'La session ha caducado!!!',
            text: 'Adios!',
            timer: 5000,
            onOpen: function () {
                swal.showLoading()
            }
        }).then(function () {},
                // handling the promise rejection
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                window.location.href = "index.jsp";
                            }
                        }
                )
            },
    registerClient: function (user) {
        Proxy.registrarCliente(user);
    }
};
