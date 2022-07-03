export const changeNameStats = (statName) => {
    return (
        statName === 'hp' ? 
            'HP' 
        : 
            statName  === 'attack' ?
                'ATQ'
            :
                statName === 'defense' ?
                    'DEF'
                : 
                    statName === 'special-attack' ?
                        'STK'
                    :
                        statName === 'special-defense' ?
                            'SDF'
                        :
                            'SPD'

    )
}

export const changeColor = color => color === 'yellow' ? '#f7d708' : color === 'white' ? 'gray' : color

export const changeFirstLetter = (word = '') => word[0]?.toUpperCase() + word?.substring(1)