class ImageStorage {
  constructor() {
    this.imageArray = [];
  }
  
  addImage(identifier, src) {
    this.imageArray.push(new ImageCell(identifier, src));
  }
  
  isLoaded() {
    console.log('Loading');
    for(var imageCell of this.imageArray) {
      if(imageCell.ready == false) {
        return false;
      }
    }
    return true;
  }
  
  getImage(identifier) {
    for(var imageCell of this.imageArray) {
      if(identifier == imageCell.identifier) {
        return imageCell.image;
      }
    }
    throw new Error("No image cell with the identifier:'" + identifier + "' found.");
  }
}

class ImageCell {
  constructor(identifier, src) {
    this.identifier = identifier;
    this.ready = false;//must be before image such that image doesn't load before this.ready is intialized
    this.image = document.createElement('img');
    this.image.src = src;
    this.image.onload = this.isReady();
    
  }
  
  isReady() {
    this.ready = true;
  }
}

function initializeImageStorage() {
  imageStorage = new ImageStorage();
  imageStorage.addImage("test","Overworld/Tile_Images/bigstock-test-icon-63758263.jpeg");
  imageStorage.addImage("footballplayerbody", "Football_Game/Linemen/footballplayerbody.png");
  imageStorage.addImage("playerbody","Football_Game/Player/playerbody.png");
  imageStorage.addImage("playerRunLeft","Football_Game/Player/playerbody_run_LFRB.png");
  imageStorage.addImage("playerRunRight","Football_Game/Player/playerbody_run_RFLB.png");
  imageStorage.addImage("coffin", "Football_Game/Linemen/footballCoffinSlender.png");
  imageStorage.addImage("coffinNoBone", "Football_Game/Linemen/footballCoffinWithoutSnappedBone.png")
  imageStorage.addImage("heart",  "Football_Game/Healthbar/life_bar_heart.png");
  imageStorage.addImage("broken_bone", "Football_Game/Ambient/broken_bone_light.png");
  imageStorage.addImage("homeBlock", "Overworld/Overlay_Images/No_Skill_World_Map.png");
  imageStorage.addImage("stadium", "Overworld/Overlay_Images/Thunder_Stadium_Map.png");
  imageStorage.addImage("playerSprite", "Overworld/Player/Chance_Base_Sprite_REST.png");
  imageStorage.addImage("playerSpriteWalkRight", "Overworld/Player/Chance_Base_Sprite_Walk_Right_Arm_Forward.png");
  imageStorage.addImage("playerSpriteWalkLeft", "Overworld/Player/Chance_Base_Sprite_Walk_Left_Arm_Forward.png");
  imageStorage.addImage("strongMan", "Overworld/People/StrongGymMan.png");
  load(function(){return imageStorage.isLoaded();});
}