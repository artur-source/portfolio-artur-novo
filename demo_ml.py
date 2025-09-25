#!/usr/bin/env python3
"""
Demo de Machine Learning - Estimativa de Valor de Projetos
Portfólio Artur Alves Santos

Este script demonstra o uso de Machine Learning para estimar o valor
sugerido de projetos web com base em características como complexidade,
prazo e número de páginas.

Dependências necessárias:
- scikit-learn
- pandas  
- joblib

Para instalar: pip install scikit-learn pandas joblib
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
import os

# Configurações
MODEL_FILE = 'projeto_valor_model.pkl'
SCALER_FILE = 'projeto_scaler.pkl'

def gerar_dados_exemplo():
    """
    Gera dados fictícios para treinamento do modelo
    Features: complexidade (1-10), prazo_dias, numero_paginas
    Target: valor_sugerido (em R$)
    """
    np.random.seed(42)  # Para reprodutibilidade
    
    # Gerar 200 amostras de exemplo
    n_samples = 200
    
    # Features
    complexidade = np.random.randint(1, 11, n_samples)  # 1-10
    prazo_dias = np.random.randint(7, 91, n_samples)    # 7-90 dias
    numero_paginas = np.random.randint(1, 21, n_samples) # 1-20 páginas
    
    # Gerar valor baseado em uma fórmula realística
    # Valor base + (complexidade * 200) + (páginas * 150) + (prazo * 10) + ruído
    valor_base = 800
    valor_sugerido = (
        valor_base +
        (complexidade * 200) +
        (numero_paginas * 150) +
        (prazo_dias * 8) +
        np.random.normal(0, 200, n_samples)  # Adicionar ruído
    )
    
    # Garantir valores mínimos positivos
    valor_sugerido = np.maximum(valor_sugerido, 500)
    
    # Criar DataFrame
    data = pd.DataFrame({
        'complexidade': complexidade,
        'prazo_dias': prazo_dias,
        'numero_paginas': numero_paginas,
        'valor_sugerido': valor_sugerido.round(2)
    })
    
    return data

def treinar_modelo():
    """
    Treina o modelo de regressão linear com os dados de exemplo
    """
    print("🤖 Gerando dados de exemplo para treinamento...")
    data = gerar_dados_exemplo()
    
    print(f"📊 Dataset criado com {len(data)} amostras")
    print("\nPrimeiras 5 amostras:")
    print(data.head())
    
    print("\n📈 Estatísticas do dataset:")
    print(data.describe())
    
    # Separar features e target
    X = data[['complexidade', 'prazo_dias', 'numero_paginas']]
    y = data['valor_sugerido']
    
    # Dividir em treino e teste
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    print(f"\n🔄 Treinando modelo...")
    print(f"   - Amostras de treino: {len(X_train)}")
    print(f"   - Amostras de teste: {len(X_test)}")
    
    # Treinar modelo
    modelo = LinearRegression()
    modelo.fit(X_train, y_train)
    
    # Avaliar modelo
    y_pred = modelo.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"\n✅ Modelo treinado com sucesso!")
    print(f"   - Erro Médio Absoluto: R$ {mae:.2f}")
    print(f"   - R² Score: {r2:.3f}")
    
    # Mostrar coeficientes
    features = ['complexidade', 'prazo_dias', 'numero_paginas']
    print(f"\n📋 Coeficientes do modelo:")
    for feature, coef in zip(features, modelo.coef_):
        print(f"   - {feature}: R$ {coef:.2f}")
    print(f"   - Intercepto: R$ {modelo.intercept_:.2f}")
    
    return modelo, X.columns

def salvar_modelo(modelo, features):
    """
    Salva o modelo treinado em arquivo
    """
    try:
        # Salvar modelo
        joblib.dump(modelo, MODEL_FILE)
        
        # Salvar informações das features
        feature_info = {
            'features': list(features),
            'model_type': 'LinearRegression'
        }
        joblib.dump(feature_info, SCALER_FILE)
        
        print(f"\n💾 Modelo salvo em: {MODEL_FILE}")
        print(f"💾 Informações salvas em: {SCALER_FILE}")
        return True
    except Exception as e:
        print(f"❌ Erro ao salvar modelo: {e}")
        return False

def carregar_modelo():
    """
    Carrega o modelo salvo
    """
    try:
        if not os.path.exists(MODEL_FILE):
            print(f"❌ Arquivo do modelo não encontrado: {MODEL_FILE}")
            return None, None
        
        modelo = joblib.load(MODEL_FILE)
        feature_info = joblib.load(SCALER_FILE)
        
        print(f"✅ Modelo carregado de: {MODEL_FILE}")
        return modelo, feature_info['features']
    except Exception as e:
        print(f"❌ Erro ao carregar modelo: {e}")
        return None, None

def fazer_predicao(modelo, features, complexidade, prazo_dias, numero_paginas):
    """
    Faz predição para um novo projeto
    """
    try:
        # Criar DataFrame com os dados de entrada
        dados_entrada = pd.DataFrame({
            'complexidade': [complexidade],
            'prazo_dias': [prazo_dias],
            'numero_paginas': [numero_paginas]
        })
        
        # Fazer predição
        valor_previsto = modelo.predict(dados_entrada)[0]
        
        return max(valor_previsto, 500)  # Valor mínimo de R$ 500
    except Exception as e:
        print(f"❌ Erro na predição: {e}")
        return None

def demonstracao_interativa():
    """
    Demonstração interativa do modelo
    """
    print("\n" + "="*60)
    print("🎯 DEMONSTRAÇÃO INTERATIVA - ESTIMATIVA DE PROJETOS")
    print("="*60)
    
    # Tentar carregar modelo existente
    modelo, features = carregar_modelo()
    
    if modelo is None:
        print("\n🔄 Modelo não encontrado. Treinando novo modelo...")
        modelo, features = treinar_modelo()
        salvar_modelo(modelo, features)
    
    print("\n" + "-"*50)
    print("📝 EXEMPLOS DE PREDIÇÃO")
    print("-"*50)
    
    # Exemplos predefinidos
    exemplos = [
        {
            'nome': 'Landing Page Simples',
            'complexidade': 3,
            'prazo_dias': 7,
            'numero_paginas': 1
        },
        {
            'nome': 'Site Institucional',
            'complexidade': 5,
            'prazo_dias': 21,
            'numero_paginas': 5
        },
        {
            'nome': 'E-commerce Básico',
            'complexidade': 8,
            'prazo_dias': 45,
            'numero_paginas': 12
        },
        {
            'nome': 'Sistema Web Complexo',
            'complexidade': 10,
            'prazo_dias': 90,
            'numero_paginas': 20
        }
    ]
    
    for exemplo in exemplos:
        valor = fazer_predicao(
            modelo, features,
            exemplo['complexidade'],
            exemplo['prazo_dias'],
            exemplo['numero_paginas']
        )
        
        print(f"\n🔹 {exemplo['nome']}")
        print(f"   Complexidade: {exemplo['complexidade']}/10")
        print(f"   Prazo: {exemplo['prazo_dias']} dias")
        print(f"   Páginas: {exemplo['numero_paginas']}")
        print(f"   💰 Valor estimado: R$ {valor:.2f}")
    
    print("\n" + "-"*50)
    print("🧠 COMO FUNCIONA O MODELO:")
    print("-"*50)
    print("• O modelo usa Regressão Linear para estimar valores")
    print("• Features consideradas: complexidade, prazo e número de páginas")
    print("• Treinado com 200 amostras sintéticas baseadas em preços reais")
    print("• Pode ser retreinado com dados reais conforme necessário")
    
    return modelo, features

def main():
    """
    Função principal
    """
    print("🚀 DEMO DE MACHINE LEARNING - ARTUR ALVES SANTOS")
    print("Estimativa de Valor de Projetos Web usando Regressão Linear")
    
    try:
        modelo, features = demonstracao_interativa()
        
        print("\n" + "="*60)
        print("✅ DEMONSTRAÇÃO CONCLUÍDA COM SUCESSO!")
        print("="*60)
        print(f"📁 Arquivos gerados:")
        print(f"   - {MODEL_FILE} (modelo treinado)")
        print(f"   - {SCALER_FILE} (informações do modelo)")
        print("\n💡 Para usar este modelo em produção:")
        print("   1. Colete dados reais de projetos anteriores")
        print("   2. Retreine o modelo com dados reais")
        print("   3. Integre com uma API web para uso online")
        
    except Exception as e:
        print(f"\n❌ Erro na execução: {e}")
        print("Verifique se as dependências estão instaladas:")
        print("pip install scikit-learn pandas joblib")

if __name__ == "__main__":
    main()

