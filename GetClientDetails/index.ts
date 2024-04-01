import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class GetClientDetails implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private ipAddressElement: HTMLParagraphElement;
    private _notifyOutputChanged: () => void;
    private textColor: string | null;
    private fontSize: string | null;
    private fontWeight: string | null;

    constructor() {}

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._notifyOutputChanged = notifyOutputChanged;
        this.ipAddressElement = document.createElement("p");
        this.textColor = context.parameters.TextColor.raw ? context.parameters.TextColor.raw : "black";
        this.fontSize = context.parameters.FontSize.raw ? context.parameters.FontSize.raw : "15";
        this.fontWeight = context.parameters.FontWeight.raw ? context.parameters.FontWeight.raw : "600";
        this.ipAddressElement.style.fontSize = this.fontSize+"px";
        this.ipAddressElement.style.fontWeight = this.fontWeight;
        this.ipAddressElement.style.color = this.textColor;
        container.appendChild(this.ipAddressElement);
        this.getIpAddress();
        notifyOutputChanged();
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const newTextColor = context.parameters.TextColor.raw ? context.parameters.TextColor.raw : "black";
        const newFontSize = context.parameters.FontSize.raw ? context.parameters.FontSize.raw : "15";
        const newFontWeight = context.parameters.FontWeight.raw ? context.parameters.FontWeight.raw : "600";
        if (this.textColor !== newTextColor) {
            // Update the text color and mark output as changed
            this.textColor = newTextColor;
            this.ipAddressElement.style.color = this.textColor;
            this._notifyOutputChanged();
        }
        if (this.fontSize !== newFontSize) {
            // Update the text color and mark output as changed
            this.fontSize = newFontSize;
            this.ipAddressElement.style.fontSize = this.fontSize+"px";
            this._notifyOutputChanged();
        }
        if (this.fontWeight !== newFontWeight) {
            // Update the text color and mark output as changed
            this.fontWeight = newFontWeight;
            this.ipAddressElement.style.fontWeight = this.fontWeight;
            this._notifyOutputChanged();
        }
    }

    public getOutputs(): IOutputs {
        return {
            IPAddress: this.ipAddressElement.textContent ? this.ipAddressElement.textContent : "" // Assuming EmployeeName is the name of your output property
        };
    }

    public destroy(): void {}

    private getIpAddress(): void {
        fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.ipAddressElement.textContent = data.ip;
                this._notifyOutputChanged(); // Notify the framework that outputs have changed
            })
            .catch(error => {
                console.error("Error fetching IP address:", error);
                this.ipAddressElement.textContent = "Error Loading IP Address"
            });
    }
}