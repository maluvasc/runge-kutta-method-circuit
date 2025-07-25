import numpy as np

def circuit_model(t, y, R, L, C, V_func):
    # calcula as derivadas (dq/dt, dI/dt) do sistema RLC
    q, i = y[0], y[1]
    
    # primeiro edo: dq/dt = i
    dqdt = i
    
    # segundo edo: dI/dt = (V(t) - R*i - q/C) / L
    didt = (1/L) * (V_func(t) - R * i - q / C)
    
    return np.array([dqdt, didt])


def runge_kutta_4(model_func, t_span, y0, h, R, L, C, V_func):
    # resolução de um sistema de edos usando o runge kutta
    t_values = np.arange(t_span[0], t_span[1], h)
    y_values = np.zeros((len(t_values), len(y0)))
    y_values[0, :] = y0

    # iteração através do tempo, calculando a solução em cada passo
    for i in range(len(t_values) - 1):
        t = t_values[i]
        y = y_values[i, :]
        
        # calcula os quatro coeficientes do runge kutta (k1, k2, k3, k4)
        k1 = h * model_func(t, y, R, L, C, V_func)
        k2 = h * model_func(t + 0.5 * h, y + 0.5 * k1, R, L, C, V_func)
        k3 = h * model_func(t + 0.5 * h, y + 0.5 * k2, R, L, C, V_func)
        k4 = h * model_func(t + h, y + k3, R, L, C, V_func)
        
        # calcula o próximo estado usando a média ponderada dos coeficientes
        y_values[i+1, :] = y + (k1 + 2*k2 + 2*k3 + k4) / 6
        
    return t_values, y_values