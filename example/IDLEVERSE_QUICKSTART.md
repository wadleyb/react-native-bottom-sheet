# Idleverse Quick Start Guide

## Running the Game

The Idleverse game is now fully integrated and ready to play!

### Start the Development Server

```bash
cd example
npm start
```

Then choose your platform:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app for physical device

### What to Expect

When you launch the app, you'll see:

1. **The World Canvas** - A light pastel infinite world with:
   - Soft green land masses
   - Subtle grid lines
   - Initial entities (1 Tree, 1 Human)

2. **Left Toolbar** with:
   - Menu button (☰) - Opens activity log
   - Speed button (🕐) - Apply speed boost
   - Search button (🔍) - Jump to bookmarks
   - Credits pill showing your current credits (starts at 200)

3. **Bottom FAB (+)** - Opens the spawn menu

### First Steps

1. **Open Spawn Menu**: Tap the + button at the bottom
2. **Spawn Entities**:
   - You start with 25 free spawns
   - Try spawning: Human, Tree, Cow, Water Patch
3. **Watch Them Move**:
   - Humans wander and explore
   - Cows graze slowly
   - Trees may spawn saplings over time
4. **Wait for Discoveries**:
   - Humans near water will discover Fish
   - Humans near trees might discover Flowers, Bushes, Rocks
   - Check discoveries every minute
5. **Claim New Skai**:
   - Green badge appears when you have new discoveries
   - Tap it to open the New Discoveries panel
   - Claim discoveries to add them to your spawn menu

### Controls

- **Pan**: Drag with one finger to move around the world
- **Zoom**: Pinch with two fingers to zoom in/out
- **Spawn**: Tap + button, select a Skai type
- **View Stats**: Tap menu button (☰) on the left

### Game Mechanics

- **Free Spawns**: Start with 25, use them before spending credits
- **Credits**: Earn more through gameplay (future feature), spend on spawns and boosts
- **Discoveries**: Limited to 3-10 per day (random daily cap)
- **Speed Boost**: 2x speed for 5 minutes costs 20 credits
- **Auto-Save**: World saves every 30 seconds automatically
- **Offline Progress**: World simulates at 0.5x speed when app is closed

### Troubleshooting

**If the app crashes on start:**
1. Make sure .env file exists in the example folder
2. Clear cache: `npm start -- --clear`
3. Rebuild: `npm start`

**If entities aren't moving:**
- The game loop starts automatically
- Movement is subtle and realistic
- Try spawning more humans to see more activity

**If discoveries aren't working:**
- Wait at least 1 minute between discovery checks
- Make sure you have different entity types near each other
- Check you haven't hit the daily discovery limit

### Project Structure

All game code is in: `example/src/idleverse/`

Key files:
- `IdleverseApp.tsx` - Main app entry point
- `components/WorldCanvas.tsx` - Skia rendering
- `store/worldStore.ts` - Game state management
- `systems/behaviour.ts` - Entity AI
- `systems/discovery.ts` - Discovery logic

### Next Steps

Try to:
1. Spawn multiple humans near trees and water
2. Wait for discoveries to appear
3. Claim discoveries and spawn new types
4. Create a thriving ecosystem with 10+ different Skai types
5. Use the speed boost to accelerate time
6. Close and reopen the app to test offline progression

Enjoy building your world in Idleverse!
