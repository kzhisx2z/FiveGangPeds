# FiveGangPeds allows you to easily manage peds

## Documentation

__spawnPed:__
This function lets you create peds. 

Usage :
```lua
local ped = exports['FiveGangPeds']:spawnPed(model: string | number, options?: {coords?: vector4, scenario?: string})
 ```
When the script stops, it automatically deletes peds to avoid several bugs


Exemple:
```lua
local ped = exports['FiveGangPeds']:spawnPed('a_f_m_tourist_01', {coords = vector4(1.0, 1.0, 1.0, 1.0), scenario = 'WORLD_HUMAN_MUSICIAN'})
 ```

__walkToCoords:__
This function allows you to walk a ped to precise coordinates. 

Usage :
```lua
exports['FiveGangPeds']:walkToCoords(coords: vector4, ped?: number, timeout: number = 5000)
 ```

Exemple:
```lua
exports['FiveGangPeds']:walkToCoords(vector4(1.0, 1.0, 1.0, 1.0), customPed, 4000)
 ```



