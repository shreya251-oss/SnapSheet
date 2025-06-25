# Fix for Plotly chart generation
# The error occurs because plotly needs additional dependencies for image export

# Solution 1: Install required dependencies
"""
pip install plotly kaleido
# OR
pip install plotly python-kaleido
# OR for conda users
conda install -c plotly plotly-orca
"""

# Solution 2: Alternative chart generation without external dependencies
import json

# Data from the provided JSON
data = [
    {"Metric":"Largest Contentful Paint","Threshold":"2500"},
    {"Metric":"Interaction to Next Paint","Threshold":"200"},
    {"Metric":"Cumulative Layout Shift","Threshold":"0.1"}
]

# Alternative 1: Generate HTML chart instead of PNG
def create_html_chart():
    import plotly.graph_objects as go
    
    metrics = [item["Metric"] for item in data]
    thresholds = [float(item["Threshold"]) for item in data]
    abbreviated_metrics = ["LCP", "INP", "CLS"]
    units = ["ms", "ms", ""]
    text_labels = [f"{threshold}{unit}" for threshold, unit in zip(thresholds, units)]
    
    fig = go.Figure(go.Bar(
        x=thresholds,
        y=abbreviated_metrics,
        orientation='h',
        text=text_labels,
        textposition='outside',
        cliponaxis=False,
        marker_color='#1FB8CD'
    ))
    
    fig.update_layout(
        title="Google Core Web Vitals Thresholds (2025)",
        xaxis_title="Time/Score",
        yaxis_title="Metrics",
        width=800,
        height=400
    )
    
    # Save as HTML instead of PNG
    fig.write_html("core_web_vitals_chart.html")
    print("Chart saved as HTML file: core_web_vitals_chart.html")

# Alternative 2: Create simple text-based visualization
def create_text_chart():
    print("Google Core Web Vitals Thresholds (2025)")
    print("=" * 50)
    
    for item in data:
        metric = item["Metric"]
        threshold = item["Threshold"]
        
        if metric == "Largest Contentful Paint":
            unit = "ms"
            bar_length = int(float(threshold) / 100)  # Scale for visualization
            print(f"LCP: {'█' * min(bar_length, 50)} {threshold}{unit}")
        elif metric == "Interaction to Next Paint":
            unit = "ms"
            bar_length = int(float(threshold) / 10)  # Scale for visualization
            print(f"INP: {'█' * min(bar_length, 50)} {threshold}{unit}")
        elif metric == "Cumulative Layout Shift":
            unit = ""
            bar_length = int(float(threshold) * 100)  # Scale for visualization
            print(f"CLS: {'█' * min(bar_length, 50)} {threshold}{unit}")
    
    print("\nThresholds represent 'Good' performance levels")

# Alternative 3: Create CSS-based chart for web display
def create_css_chart():
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Core Web Vitals Thresholds</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .chart-container { max-width: 800px; margin: 0 auto; }
            .chart-title { text-align: center; margin-bottom: 30px; color: #333; }
            .metric { margin-bottom: 20px; }
            .metric-label { font-weight: bold; margin-bottom: 5px; }
            .bar-container { background: #f0f0f0; height: 40px; position: relative; border-radius: 5px; }
            .bar { height: 100%; border-radius: 5px; display: flex; align-items: center; padding: 0 10px; color: white; font-weight: bold; }
            .lcp-bar { background: #1FB8CD; width: 100%; }
            .inp-bar { background: #1FB8CD; width: 8%; }
            .cls-bar { background: #1FB8CD; width: 10%; }
        </style>
    </head>
    <body>
        <div class="chart-container">
            <h2 class="chart-title">Google Core Web Vitals Thresholds (2025)</h2>
            
            <div class="metric">
                <div class="metric-label">Largest Contentful Paint (LCP)</div>
                <div class="bar-container">
                    <div class="bar lcp-bar">2500ms</div>
                </div>
            </div>
            
            <div class="metric">
                <div class="metric-label">Interaction to Next Paint (INP)</div>
                <div class="bar-container">
                    <div class="bar inp-bar">200ms</div>
                </div>
            </div>
            
            <div class="metric">
                <div class="metric-label">Cumulative Layout Shift (CLS)</div>
                <div class="bar-container">
                    <div class="bar cls-bar">0.1</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    with open("core_web_vitals_chart.html", "w") as f:
        f.write(html_content)
    
    print("CSS-based chart saved as: core_web_vitals_chart.html")

# Run the alternatives
if __name__ == "__main__":
    print("Generating Core Web Vitals charts...")
    
    try:
        # Try HTML chart first
        create_html_chart()
    except ImportError:
        print("Plotly not available, creating CSS chart instead...")
        create_css_chart()
    
    # Always create text version
    print("\nText version:")
    create_text_chart()
