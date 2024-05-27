local peds = {}

RegisterNetEvent('onResourceStop', function(resource)
    if (GetCurrentResourceName() ~= resource) then
        return
    end

    for _, ped in pairs(peds) do
        SetEntityAsMissionEntity(ped, true, true)
        DeletePed(ped)
    end
end)

function SpawnPed(model, coords, options) 
    if not model or (type(model) ~= "string" or type(model) ~= "number") then
        print('Please enter a valid model hash')
        return
    end

    local playerPed = PlayerPedId()

    if not coords then
        local playerCoords = GetEntityCoords(playerPed)
        coords = vector4(playerCoords.x, playerCoords.y, playerCoords.z, GetEntityHeading(playerPed))
    end

    local _, groundZ = GetGroundZFor_3dCoord(coords.x, coords.y, coords.z, true)
    coords.z = groundZ

    

end