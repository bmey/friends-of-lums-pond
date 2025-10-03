interface Auction {
  name: string;
  description: string;
  image: string;
  status: string;
}

export const AUCTIONS: Auction[] = [
    {
    id: "auc001", 
    name: "Crochet Blanket", 
    description: "Hand-crafted large crochet blanket, made by a member of FOLP.", 
    status: "Silent auction will end at 3:30pm."
  },

  {
    id: "auc005", 
    name: "Deerfield Golf Club (1 of 4)", 
    description: "Golf Foursome Package – Enjoy a round of golf for four at Deerfield, complete with pristine fairways and an unforgettable golf experience.", 
    status: "Silent auction will end at 3:30pm."
  },
];