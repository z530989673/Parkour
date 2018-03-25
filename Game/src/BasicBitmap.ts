// TypeScript file

class BasicBitmap extends egret.Bitmap {
    
    public constructor(path:string, rect:egret.Rectangle) {
        super();

        this.texture = RES.getRes('bg_jpg');        
        this.width =  rect.width;
        this.height = rect.height;
        this.x = rect.x;
        this.y = rect.y;
        this.fillMode = egret.BitmapFillMode.REPEAT;

        let vertexSrc =
            "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +
            "uniform vec4 uvRect;\n" +
            "uniform vec2 textureSize;\n" +

            "uniform vec2 projectionVector;\n" +

            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +

            "const vec2 center = vec2(-1.0, 1.0);\n" +

            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center, 0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord + (uvRect.xy) / textureSize;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
            
        let fragmentSrc =
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +

            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, fract(vTextureCoord));\n" +
            "gl_FragColor = fg * vColor;\n" +
            "}";

        let customFilter = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc,
            {
                uvRect: {x : 0.1 * this.texture.textureWidth,
                        y : 0.5 * this.texture.textureHeight, z : this.width, w : this.height},
                textureSize: {x : this.texture.textureWidth, y : this.texture.textureHeight}
            }
        );
        this.filters = [customFilter];
    }
}