import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Alert} from 'react-native';

import params from './src/params';
import MineField from './src/components/MineField';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './src/functions';

const App = () => {
  const [board, setBoard] = useState([]);
  const [levelSelection, setLevelSelection] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  const createNewGame = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    const minesCount = minesAmount();
    const mines = createMinedBoard(rows, cols, minesCount);
    setBoard(mines);
    setLevelSelection(false);
  };

  useEffect(() => {
    createNewGame();
  }, []);

  const onOpenField = (row, column) => {
    const boardCloned = cloneBoard(board);

    openField(boardCloned, row, column);
    const lostGame = hadExplosion(boardCloned);

    const wonSesion = wonGame(boardCloned);

    if (lostGame) {
      showMines(boardCloned);
      Alert.alert('Perdeueueueueu!', 'Que burrao');
    }

    if (wonSesion) {
      Alert.alert('Parabens!', 'se garantiu');
    }
    setLost(lostGame);
    setWon(wonSesion);
    setBoard(boardCloned);
  };

  const onSelectField = (row, column) => {
    const boardCloned = cloneBoard(board);
    invertFlag(boardCloned, row, column);
    const wonSesion = wonGame(boardCloned);
    setBoard(boardCloned);
    if (wonSesion) {
      Alert.alert('Parabéns', 'voce ganhou');
    }
  };

  const onLevelSelect = level => {
    params.difficultLevel = level;
    createNewGame();
  };

  return (
    <View style={styles.container}>
      <LevelSelection
        isVisible={levelSelection}
        onLevelSelected={onLevelSelect}
        onCancel={() => setLevelSelection(false)}
      />
      <Header
        flagsLeft={minesAmount() - flagsUsed(board)}
        onNewGame={() => createNewGame()}
        onFlagPress={() => setLevelSelection(true)}
      />

      <SafeAreaView style={styles.board}>
        <MineField
          board={board}
          onOpenField={onOpenField}
          onSelectField={onSelectField}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});

export default App;
