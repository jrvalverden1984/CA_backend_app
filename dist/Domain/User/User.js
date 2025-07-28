"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(UserID, CompanyID, Login, FirstName, LastName, Password, ExpirationDate, Metadata) {
        this.UserID = UserID;
        this.CompanyID = CompanyID;
        this.Login = Login;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Password = Password;
        this.ExpirationDate = ExpirationDate;
        this.Metadata = Metadata;
    }
    changeName(newFirstName, newLastName) {
        this.FirstName = newFirstName;
        this.LastName = newLastName;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map