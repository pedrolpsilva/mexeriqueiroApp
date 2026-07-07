import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { COLORS } from "../constants/theme";

export default function Rules() {
  const router = useRouter();
  const [showLanguageModal, setShowLanguageModal] = React.useState(false);

  const CARDS = [
    {
      id: "coringa",
      title: "Coringa",
      desc: "Se o time acertar a palavra ganhará 30% da pontuação para vitória",
      icon: (
        <MaterialCommunityIcons
          name="cards-playing-outline"
          size={36}
          color={COLORS.primary}
        />
      ),
    },
    {
      id: "gemeos",
      title: "Gêmeos",
      desc: "O time rival ganha os mesmos pontos que você nesta rodada.",
      icon: (
        <FontAwesome5 name="user-friends" size={32} color={COLORS.primary} />
      ),
    },
    {
      id: "bomb",
      title: "Autodestruição",
      desc: "O time perde a rodada instantaneamente, passando a vez ao rival sem a possibilidade de roubo de palavra.",
      icon: (
        <MaterialCommunityIcons name="bomb" size={36} color={COLORS.primary} />
      ),
    },
    {
      id: "fratura",
      title: "Fratura",
      desc: "Caso o time não acerte a PALAVRA DA RODADA ou o tempo acabe, esta carta irá descontar 3 pontos ao time",
      icon: (
        <MaterialCommunityIcons name="bone" size={36} color={COLORS.primary} />
      ),
    },
    {
      id: "riqueza",
      title: "Riqueza",
      desc: "Acerto garante o valor máximo do cronômetro.",
      icon: <FontAwesome5 name="coins" size={32} color={COLORS.primary} />,
    },
    {
      id: "dose",
      title: "Dose Dupla",
      desc: "Garante uma rodada extra.",
      icon: (
        <MaterialCommunityIcons
          name="cards-playing"
          size={36}
          color={COLORS.primary}
        />
      ),
    },
    {
      id: "oportuno",
      title: "Oportuno",
      desc: "Dá uma dica extra ao time.",
      icon: (
        <MaterialCommunityIcons
          name="lightbulb-on"
          size={36}
          color={COLORS.primary}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Como Jogar"
        onLanguagePress={() => setShowLanguageModal(true)}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Preparação */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>1</Text>
            </View>
            <Text style={styles.sectionTitle}>Preparação e Ordem</Text>
          </View>
          <Text style={styles.paragraph}>
            Times com o mesmo número de jogadores (mínimo 3). A posição e ordem
            dos jogadores são fixas e não podem ser alteradas após o início. O
            primeiro jogador de cada time inicia o turno.
          </Text>
        </View>

        {/* 2. Dinâmica da Rodada */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>2</Text>
            </View>
            <Text style={styles.sectionTitle}>A Dinâmica da Rodada</Text>
          </View>
          <Text style={styles.paragraph}>
            O Líder rola o dado para definir o tema (Abstrato, Vivo, Consumo,
            Objeto ou Lazer). Ele lê a{" "}
            <Text style={styles.bold}>PALAVRA DA RODADA</Text> em segredo e tem
            até 10 segundos de preparação. O Líder dá uma{" "}
            <Text style={styles.bold}>DICA</Text> (apenas uma palavra) e o
            colega faz uma <Text style={styles.bold}>TENTATIVA</Text> (apenas
            uma palavra).
          </Text>
          <View style={styles.highlightBox}>
            <Ionicons name="warning-outline" size={20} color={COLORS.dark} />
            <Text style={styles.highlightText}>
              Se errar, a vez passa para o próximo jogador do mesmo time para
              uma nova dica/tentativa, até acertar, o tempo acabar ou todos do
              time terem tentado uma vez.
            </Text>
          </View>
        </View>

        {/* 3. Pontuação */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>3</Text>
            </View>
            <Text style={styles.sectionTitle}>Pontuação Decimal</Text>
          </View>
          <Text style={styles.paragraph}>
            O acerto rende pontos iguais ao tempo restante no Timer. O sistema
            usa uma casa decimal: 46 segundos viram 4,6 pontos; 24 segundos
            viram 2,4 pontos. Se o tempo for menor que 10s (ex: 5s), o valor é
            0,5 pontos.
          </Text>
        </View>

        {/* 4. Cartas Especiais */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>4</Text>
            </View>
            <Text style={styles.sectionTitle}>Guia de Cartas Especiais</Text>
          </View>
          <Text style={styles.paragraph}>
            Deslize para ver os efeitos de cada carta:
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
          >
            {CARDS.map((card) => (
              <View key={card.id} style={styles.carouselCard}>
                <View style={styles.cardIconWrapper}>{card.icon}</View>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardDesc}>{card.desc}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 5. Roubar a Rodada */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>5</Text>
            </View>
            <Text style={styles.sectionTitle}>Roubar a Rodada</Text>
          </View>
          <Text style={styles.paragraph}>
            Se o time atual falhar em todas as tentativas e o Timer não acabar,
            o rival <Text style={styles.bold}>ROUBA</Text> a rodada para tentar
            acertar a palavra antes de iniciar seu próprio turno.
          </Text>
        </View>

        {/* 6. Regras de Conduta */}
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <MaterialCommunityIcons
              name="alert-octagon"
              size={24}
              color="#FFF"
            />
            <Text style={styles.alertTitle}>REGRAS DE CONDUTA</Text>
          </View>
          <View style={styles.alertList}>
            <Text style={styles.alertItem}>
              • É proibido o uso de frases, mímicas, sons ou palavras com hífen
              (ex: guarda-roupas).
            </Text>
            <Text style={styles.alertItem}>
              • O jogo não pode ser pausado durante a rodada.
            </Text>
            <Text style={styles.alertItem}>• Apenas o líder vê a palavra.</Text>
          </View>
        </View>
      </ScrollView>

      <Footer buttonText="ENTENDIDO" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120, // Space for the fixed footer
  },
  sectionBlock: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0D8D0",
    borderBottomWidth: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  numberText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
  bold: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  highlightBox: {
    flexDirection: "row",
    backgroundColor: COLORS.support,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
    fontStyle: "italic",
    lineHeight: 20,
  },
  carouselContainer: {
    paddingTop: 16,
    paddingBottom: 8,
    gap: 16,
  },
  carouselCard: {
    backgroundColor: "#fff",
    width: 200,
    padding: 20,
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#E0D8D0",
    borderBottomWidth: 4,
    alignItems: "center",
  },
  cardIconWrapper: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
    textAlign: "center",
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },
  alertBox: {
    backgroundColor: COLORS.dark,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: 6,
    borderColor: "#b94b30",
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1,
  },
  alertList: {
    gap: 12,
  },
  alertItem: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 22,
    fontWeight: "500",
  },
});
