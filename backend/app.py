from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
import pandas as pd
import io 

from runge_kutta import circuit_model, runge_kutta_4

app = Flask(__name__)
CORS(app)

@app.route('/runge_kutta_img', methods=['GET'])
def runge_kutta_img():
    """
    API endpoint to simulate an RLC circuit and return a plot of current vs. time.

    Parameters are passed via URL query arguments:
    - R (float): Resistance in Ohms.
    - L (float): Inductance in Henrys.
    - C (float): Capacitance in Farads.
    - source_type (str): 'DC' or 'AC'.
    - dc_voltage (float, optional): DC voltage if source_type is 'DC'.
    - ac_amplitude (float, optional): AC amplitude if source_type is 'AC'.
    - ac_frequency (float, optional): AC frequency if source_type is 'AC'.
    - simulation_time_end (float, optional): End time for simulation (default: 20.0s).
    - time_step (float, optional): Time step for RK4 (default: 0.0001s).

    Returns:
        Sends an image file (PNG) of the current vs. time plot.
        Returns JSON error message if input is invalid.
    """
    try:
        # Circuit parameters
        R_val = float(request.args.get('R'))
        L_val = float(request.args.get('L'))
        C_val = float(request.args.get('C'))
        source_type = request.args.get('source_type').upper()

        # Simulation parameters
        simulation_time_end = float(request.args.get('simulation_time_end', 20.0))
        time_step = float(request.args.get('time_step', 0.0001))

        V_func = None
        if source_type == 'DC':
            dc_voltage = float(request.args.get('dc_voltage'))
            V_func = lambda t: dc_voltage
        elif source_type == 'AC':
            ac_amplitude = float(request.args.get('ac_amplitude'))
            ac_frequency = float(request.args.get('ac_frequency'))
            V_func = lambda t: ac_amplitude * np.sin(2 * np.pi * ac_frequency * t)
        else:
            return jsonify({"error": "Fonte de corrente inválida. Escolha entre 'DC' (contínua) ou 'AC' (alternada)."}), 400

    except (TypeError, ValueError) as e:
        return jsonify({"error": f"Parâmetros inválidos: {e}. Valores precisam ser numéricos."}), 400
    except Exception as e:
        return jsonify({"error": f"Erro de parsing: {e}"}), 500

    # Initial conditions
    initial_charge = 0.0
    initial_current = 0.0
    y0_initial = np.array([initial_charge, initial_current])
    t_span_sim = (0, simulation_time_end)

    try:
        # Run the simulation
        time_points, state_results = runge_kutta_4(
            circuit_model, t_span_sim, y0_initial, time_step,
            R_val, L_val, C_val, V_func
        )
        current_results = state_results[:, 1] # Extract current (second column)

        # Generate the plot
        plt.figure(figsize=(12, 7))
        plt.plot(time_points, current_results, label='Corrente (I)')
        plt.xlabel("Tempo (s)")
        plt.ylabel("Corrente (A)")
        plt.title(f"Corrente vs. Tempo")
        plt.grid(True)
        plt.legend()
        plt.tight_layout()

        # Save plot to a BytesIO object (in-memory file)
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png')
        plt.close()
        buffer.seek(0)

        return send_file(buffer, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": f"An error occurred during simulation or plotting: {e}"}), 500

@app.route('/runge_kutta_csv')
def runge_kutta_csv():
    try:
        # Circuit parameters
        R_val = float(request.args.get('R'))
        L_val = float(request.args.get('L'))
        C_val = float(request.args.get('C'))
        source_type = request.args.get('source_type').upper()

        # Simulation parameters
        simulation_time_end = float(request.args.get('simulation_time_end', 20.0))
        time_step = float(request.args.get('time_step', 0.0001))

        V_func = None
        if source_type == 'DC':
            dc_voltage = float(request.args.get('dc_voltage'))
            V_func = lambda t: dc_voltage
        elif source_type == 'AC':
            ac_amplitude = float(request.args.get('ac_amplitude'))
            ac_frequency = float(request.args.get('ac_frequency'))
            V_func = lambda t: ac_amplitude * np.sin(2 * np.pi * ac_frequency * t)
        else:
            return jsonify({"error": "Fonte de corrente inválida. Escolha entre 'DC' (contínua) ou 'AC' (alternada)."}), 400

    except (TypeError, ValueError) as e:
        return jsonify({"error": f"Parâmetros inválidos: {e}. Valores precisam ser numéricos."}), 400
    except Exception as e:
        return jsonify({"error": f"Erro de parsing: {e}"}), 500

    # Initial conditions
    initial_charge = 0.0
    initial_current = 0.0
    y0_initial = np.array([initial_charge, initial_current])
    t_span_sim = (0, simulation_time_end)

    try:
        # Run the simulation
        time_points, state_results = runge_kutta_4(
            circuit_model, t_span_sim, y0_initial, time_step,
            R_val, L_val, C_val, V_func
        )

        # Create DataFrame Pandas and save CSV
        df = pd.DataFrame({
            'Tempo (s)': time_points,
            'Carga (q)': state_results[:, 0],
            'Corrente (I)': state_results[:, 1]
        })

        # CSV to BytesIO
        buffer = io.StringIO()
        df.to_csv(buffer, index=False)
        buffer.seek(0)

        return send_file(
            io.BytesIO(buffer.getvalue().encode('utf-8')), # StringIO to BytesIO
            mimetype='text/csv',
            as_attachment=True,
            download_name=f'runge_kutta.csv'
        )

    except Exception as e:
        return jsonify({"erro": f"Ocorreu um erro durante a simulação ou geração do CSV: {e}"}), 500


if __name__ == '__main__':
    # Example:
    # For DC: http://127.0.0.1:5000/runge_kutta_img?R=2&L=5&C=4&source_type=DC&dc_voltage=10
    # For AC: http://127.0.0.1:5000/runge_kutta_img?R=2&L=5&C=4&source_type=AC&ac_amplitude=0.1&ac_frequency=0.05
    app.run(debug=True)