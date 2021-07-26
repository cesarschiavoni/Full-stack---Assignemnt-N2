export class Wallet {
    constructor(
        public Id: number,
        public Name: string,
        public AccountBalanceEth: number,
        public TranDate: Date,
        public Favorite: Boolean,
        public Old: Boolean,
        public UserKey: string
    ) {}
  }
  
  export class WalletHTTP {
    constructor(    
      public Id: number,
      public Name: string,
      public AccountBalanceEth: number,
      public TranDate: Date,
      public Favorite: Boolean,
      public Old: Boolean,
      public UserKey: string
    ) {}
  }