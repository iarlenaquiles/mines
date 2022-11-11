import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Alert} from 'react-native';

import params from './src/params';
import MineField from './src/components/MineField';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
} from './src/functions';

const App = () => {
  const [board, setBoard] = useState([]);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  useEffect(() => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    const minesCount = minesAmount();
    const mines = createMinedBoard(rows, cols, minesCount);
    setBoard(mines);
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

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Iniciando o mines</Text>
      <Text style={styles.instructions}>
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>

      <SafeAreaView style={styles.board}>
        <MineField board={board} onOpenField={onOpenField} />
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
