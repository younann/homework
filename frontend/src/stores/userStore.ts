import { makeAutoObservable } from "mobx";
import Cookies from "js-cookie";
interface User {
  id: number;
  googleId: string;
  displayName: string;
  email: string;
  profileImage: string;
  favoriteStocks: string[];
}

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(userData: any) {
    this.user = userData;
    this.updateCookies();
  }
  updateCookies() {
    if (this.user) {
      Cookies.set("user", JSON.stringify(this.user), { expires: 1 });
    } else {
      Cookies.remove("user");
    }
  }

  get isLoggedIn() {
    return !!this.user;
  }

  get userId() {
    return this.user?.googleId;
  }

  get displayName() {
    return this.user?.displayName;
  }
  setDisplayName(name: string) {
    if (this.user) {
      this.user.displayName = name;
    }
  }

  get email() {
    return this.user?.email;
  }

  get image() {
    return this.user?.profileImage;
  }

  get stocks() {
    return this.user?.favoriteStocks?.slice();
  }
  setStocks(stocksData: any) {
    if (this.user) {
      this.user.favoriteStocks = stocksData;
    }
  }
}

export const userStore = new UserStore();
