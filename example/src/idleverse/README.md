# Idleverse - Mobile Idle Game

A living sandbox world where players create, spawn, and watch their world evolve with various Skai entities.

## Features

### Core Gameplay
- **Infinite World Canvas**: Pan and zoom through a procedurally rendered world
- **Skai Entities**: Spawn and manage various creatures and objects
- **Discovery System**: Unlock new Skai types through natural interactions
- **Daily Discovery Limit**: 3-10 new discoveries per day to maintain progression pace
- **Free Spawns**: Start with 25 free spawns, then use credits
- **Offline Progression**: World continues to evolve while app is closed

### World Entities (Skai)

**Starter Types** (Available from the beginning):
- Human - Curious wanderers who discover new things
- Tree - Provides shade and spawns saplings
- Cow - Peaceful grazers that roam the land
- Water Patch - Essential for fish and life

**Discoverable Types** (Unlock through gameplay):
- Bee - Pollinates flowers (discovered near flowers)
- Fish - Swims in water (discovered in water patches)
- Flower - Beautiful blooms (discovered near trees)
- Bush - Small shrubs (discovered near trees)
- Rock - Sturdy stones (discovered naturally)
- House - Shelter for humans (built by humans near trees)
- Wolf - Wild hunters (appear near forests)
- Fire - Warm and dangerous (discovered by humans)
- Road - Connects places (built by humans)
- UFO - Mysterious visitor (rare random discovery)

### Discovery Mechanics
Skai can discover new types through proximity and interaction:
- Humans near water → discover Fish
- Humans near flowers → discover Bees
- Humans near trees → discover Flowers, Bushes, Rocks, Houses
- Cows near forests → attract Wolves
- Humans near houses → discover Fire and Roads
- Random rare spawns → UFO

### UI Components

**Left Toolbar**:
- Menu button - Opens activity log and world stats
- Speed button - Apply 2x speed boost (costs 20 credits)
- Search button - Jump to bookmarks
- Credits display - Shows current credits

**Bottom Spawn Menu**:
- Organized by categories (All, Nature, Animals, Structures)
- Shows spawn cost (free spawns or credits)
- Displays unlocked and starter Skai

**Activity Log**:
- World age and living entity count
- Free spawns remaining
- Daily discovery progress
- Recent world events
- Delete world option

**New Discoveries Dashboard**:
- Shows unclaimed discoveries
- Claim to add to spawn menu
- Source description for each discovery

**Notifications**:
- Toast messages for important events
- Discovery announcements
- System messages

### Persistence
- Auto-saves every 30 seconds to local storage
- Loads previous world state on app start
- Supabase integration ready for cloud sync (database already set up)

### Behaviour System
Each Skai type has unique behaviors:
- **Humans**: Wander, rest, discover new things
- **Bees**: Fly in loops, hover near flowers
- **Cows**: Graze slowly, rest frequently
- **Fish**: Swim in water patches
- Static types (Tree, Rock, etc.) may spawn new entities

### Technical Stack
- React Native + Expo
- @shopify/react-native-skia for rendering
- react-native-gesture-handler for touch controls
- react-native-reanimated for smooth animations
- Zustand for state management
- AsyncStorage for local persistence
- Supabase for cloud database (ready to use)

## Project Structure

```
src/idleverse/
├── components/
│   ├── sprites/          # Skia sprite components
│   ├── WorldCanvas.tsx   # Main game canvas
│   ├── LeftToolbar.tsx
│   ├── ActivityLogPanel.tsx
│   ├── NewSkaiDashboard.tsx
│   ├── SpawnMenu.tsx
│   ├── TopNotificationStack.tsx
│   ├── BottomSpawnFab.tsx
│   └── GameLoop.tsx
├── store/
│   └── worldStore.ts     # Zustand store
├── systems/
│   ├── behaviour.ts      # Entity AI and movement
│   ├── discovery.ts      # Discovery rules and logic
│   ├── offline.ts        # Offline progression simulation
│   └── persistence.ts    # Save/load functionality
├── types/
│   ├── skai.ts          # Entity type definitions
│   └── world.ts         # World state types
└── IdleverseApp.tsx     # Main app component
```

## How to Play

1. **Start**: Create your world with 25 free spawns
2. **Spawn**: Tap the '+' button to open the spawn menu
3. **Explore**: Pan and pinch to zoom around the world
4. **Watch**: Entities move and interact automatically
5. **Discover**: New Skai types unlock through natural interactions
6. **Claim**: Open the new discoveries dashboard to claim unlocks
7. **Expand**: Continue spawning and discovering new Skai types

## Game Loop
The game runs at 30 FPS with these systems:
- **Tick System**: Updates entity positions and states
- **Discovery Check**: Every 60 seconds, checks for new discoveries
- **Sapling Spawn**: Every 120 seconds, trees may spawn saplings
- **Offline Simulation**: When reopening app, simulates elapsed time at 0.5x speed

## Future Enhancements
- Cloud sync with Supabase authentication
- More Skai types and discovery chains
- Player-triggered events and quests
- Biomes and environment types
- Social features (visit other worlds)
- Achievements and milestones
