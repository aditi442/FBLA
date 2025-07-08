
export class UserModel {
    userId: BigInt | undefined;
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
    token: string | undefined;
  
    setUser(_user: unknown) {
      const user = _user as UserModel;
      this.userId = user.userId;
      this.username = user.username || '';
      this.password = user.password || '';
      this.email = user.email || '';
      this.token = user.token || '';     
    }

    getCurrentUser() {
        return this.username;
    }
  }